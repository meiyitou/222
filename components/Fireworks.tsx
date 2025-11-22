
import React, { useEffect, useRef } from 'react';

interface FireworksProps {
  onComplete: () => void;
}

const Fireworks: React.FC<FireworksProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resizeHandler = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resizeHandler);

    // Fireworks variables
    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    const MAX_PARTICLES = 400;
    const colors = ['#ff0043', '#14fc56', '#1e90ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.decay = Math.random() * 0.015 + 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // Gravity
        this.vx *= 0.95; // Friction
        this.vy *= 0.95;
        this.alpha -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Rocket {
      x: number;
      y: number;
      vy: number;
      color: string;
      exploded: boolean;

      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.vy = -(Math.random() * 5 + 12); // Launch speed
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.exploded = false;
      }

      update() {
        this.y += this.vy;
        this.vy += 0.15; // Gravity pulling down rocket slightly
        
        // Explode when it reaches peak (velocity matches gravity or specific height)
        if (this.vy >= -2) {
          this.explode();
        }
      }

      explode() {
        this.exploded = true;
        // Create explosion particles
        for (let i = 0; i < 80; i++) {
          particles.push(new Particle(this.x, this.y, this.color));
        }
        // Flash effect
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx!.fillRect(0, 0, width, height);
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.exploded) return;
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Trail
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 10);
        ctx.strokeStyle = this.color;
        ctx.stroke();
      }
    }

    let animationFrameId: number;
    let startTime = Date.now();
    const DURATION = 6000; // Run for 6 seconds
    let spawning = true;

    const loop = () => {
      // Clear canvas with trail effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Check duration
      if (Date.now() - startTime > DURATION) {
        spawning = false;
      }

      // Spawn rockets
      if (spawning && Math.random() < 0.05) {
        rockets.push(new Rocket());
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw(ctx);
        if (rockets[i].exploded) {
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      // Check if done
      if (!spawning && rockets.length === 0 && particles.length === 0) {
        cancelAnimationFrame(animationFrameId);
        onComplete();
        return;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[100] pointer-events-none" />;
};

export default Fireworks;
