import { RefObject, useEffect, useRef } from 'react';
import { Bodies, Composite, Constraint, Engine, Sleeping } from 'matter-js';

const STEP = 1000 / 60;
type ReturnMotion = { element: HTMLElement; x: number; y: number; angle: number; duration: number; delay: number };

export default function useDesktopPhysics(rootRef: RefObject<HTMLDivElement | null>, enabled: boolean) {
  const returning = useRef<{ timer: number; items: ReturnMotion[] } | null>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;
    if (returning.current) {
      window.clearInterval(returning.current.timer);
      returning.current.items.forEach(({ element }) => {
        element.style.translate = '0px 0px';
        element.style.rotate = '0rad';
      });
      returning.current = null;
    }
    const rect = root.getBoundingClientRect();
    const floor = rect.height - 86;
    const engine = Engine.create({ enableSleeping: true });
    engine.gravity.y = 1.4;
    const entries = Array.from(root.querySelectorAll<HTMLElement>('[data-gravity-item]')).filter(element => element.getBoundingClientRect().width > 0).map(element => {
      element.style.translate = '0px 0px';
      element.style.rotate = '0rad';
      const box = element.getBoundingClientRect();
      const origin = { x: box.left - rect.left + box.width / 2, y: box.top - rect.top + box.height / 2 };
      const body = Bodies.rectangle(origin.x, origin.y, box.width, box.height, {
        restitution: 0.35, friction: 0.1, frictionAir: 0.01,
        chamfer: { radius: Math.min(box.width, box.height) * 0.15 },
      });
      const previous = { cursor: element.style.cursor, touchAction: element.style.touchAction, willChange: element.style.willChange };
      element.style.cursor = 'grab';
      element.style.touchAction = 'none';
      element.style.willChange = 'translate, rotate';
      return { element, body, origin, previous };
    });
    Composite.add(engine.world, [
      ...entries.map(entry => entry.body),
      Bodies.rectangle(rect.width / 2, floor + 200, rect.width + 800, 400, { isStatic: true }),
      Bodies.rectangle(-200, rect.height / 2, 400, rect.height + 800, { isStatic: true }),
      Bodies.rectangle(rect.width + 200, rect.height / 2, 400, rect.height + 800, { isStatic: true }),
      Bodies.rectangle(rect.width / 2, -172, rect.width + 800, 400, { isStatic: true }),
    ]);
    // Embedded previews can suspend animation-frame callbacks while timers still run.
    let previousTime = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = Math.min(Math.max(now - previousTime, 1), 50);
      previousTime = now;
      if (document.hidden) return;
      const steps = Math.ceil(delta / STEP);
      for (let i = 0; i < steps; i++) Engine.update(engine, delta / steps);
      entries.forEach(({ element, body, origin }) => {
        element.style.translate = `${body.position.x - origin.x}px ${body.position.y - origin.y}px`;
        element.style.rotate = `${body.angle}rad`;
      });
    }, STEP);

    let held: typeof entries[number] | undefined;
    let pointerId: number | undefined;
    let tether: Constraint | undefined;
    let suppressClickUntil = 0;
    const down = (event: PointerEvent) => {
      if (held || event.button !== 0) return;
      const element = (event.target as HTMLElement).closest('[data-gravity-item]');
      held = entries.find(entry => entry.element === element);
      if (!held) return;
      event.preventDefault();
      event.stopPropagation();
      pointerId = event.pointerId;
      root.setPointerCapture(pointerId);
      const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      Sleeping.set(held.body, false);
      tether = Constraint.create({
        pointA: point, bodyB: held.body,
        pointB: { x: point.x - held.body.position.x, y: point.y - held.body.position.y },
        length: 0, stiffness: 0.2, damping: 0.08,
      });
      Composite.add(engine.world, tether);
      root.style.cursor = 'grabbing';
      held.element.style.cursor = 'grabbing';
    };
    const move = (event: PointerEvent) => {
      if (!tether || event.pointerId !== pointerId) return;
      tether.pointA = {
        x: Math.max(0, Math.min(rect.width, event.clientX - rect.left)),
        y: Math.max(28, Math.min(floor, event.clientY - rect.top)),
      };
      if (held) Sleeping.set(held.body, false);
    };
    const release = (event?: PointerEvent | Event) => {
      if (event && 'pointerId' in event && event.pointerId !== pointerId) return;
      if (held) suppressClickUntil = performance.now() + 250;
      if (tether) Composite.remove(engine.world, tether);
      tether = undefined;
      if (held) held.element.style.cursor = 'grab';
      held = undefined;
      const captured = pointerId;
      pointerId = undefined;
      if (captured !== undefined && root.hasPointerCapture(captured)) root.releasePointerCapture(captured);
      root.style.cursor = '';
    };
    const click = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('[data-gravity-item]') || (event.detail > 0 && performance.now() < suppressClickUntil)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    root.addEventListener('pointerdown', down, true);
    root.addEventListener('pointermove', move);
    root.addEventListener('pointerup', release);
    root.addEventListener('pointercancel', release);
    root.addEventListener('lostpointercapture', release);
    root.addEventListener('click', click, true);
    window.addEventListener('blur', release);
    return () => {
      window.clearInterval(timer);
      release();
      root.removeEventListener('pointerdown', down, true);
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerup', release);
      root.removeEventListener('pointercancel', release);
      root.removeEventListener('lostpointercapture', release);
      root.removeEventListener('click', click, true);
      window.removeEventListener('blur', release);
      entries.forEach(({ element, previous }) => {
        element.style.cursor = previous.cursor;
        element.style.touchAction = previous.touchAction;
        element.style.willChange = previous.willChange;
      });
      const distances = entries.map(({ body, origin }) => Math.hypot(body.position.x - origin.x, body.position.y - origin.y));
      const max = Math.max(1, ...distances);
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const items = entries.map(({ element, body, origin }, index) => ({
        element, x: body.position.x - origin.x, y: body.position.y - origin.y, angle: body.angle,
        duration: reducedMotion ? 0 : 1250 + distances[index] / max * 1000,
        delay: reducedMotion ? 0 : index * 30,
      }));
      const started = performance.now();
      const returnTimer = window.setInterval(() => {
        const elapsed = performance.now() - started;
        let done = true;
        items.forEach(({ element, x, y, angle, duration, delay }) => {
          const t = duration ? Math.max(0, Math.min(1, (elapsed - delay) / duration)) : 1;
          const remaining = Math.pow(1 - t, 4);
          element.style.translate = `${x * remaining}px ${y * remaining}px`;
          element.style.rotate = `${angle * remaining}rad`;
          if (t < 1) done = false;
        });
        if (done) {
          window.clearInterval(returnTimer);
          returning.current = null;
        }
      }, STEP);
      returning.current = { timer: returnTimer, items };
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [enabled, rootRef]);

  useEffect(() => () => {
    if (returning.current) window.clearInterval(returning.current.timer);
  }, []);
}
