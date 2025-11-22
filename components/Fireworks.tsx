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

    // ===========================
    // Configuration
    // ===========================
    const PARTICLES_PER_EXPLOSION = 180;
    const ROCKET_SPAWN_RATE = 0.04; 
    const GRAVITY = 0.04;
    const FRICTION = 0.96;
    const DURATION = 8000; // Animation lasts 8 seconds

    // Premium Color Palettes
    const PALETTES = [
      ['#FFD700', '#FDB931', '#FFFFFF'], // Luxurious Gold
      ['#FF0055', '#00FFFF', '#FFFFFF'], // Cyberpunk Neon
      ['#FF9966', '#FF5E62', '#FFFFFF'], // Sunset Glow
      ['#E0C3FC', '#8EC5FC', '#FFFFFF'], // Holographic Ice
    ];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      decay: number;
      size: number;

      constructor(x: number, y: number, color: string, velocityMultiplier: number = 1) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        // Random spread with some particles moving faster than others (Core vs Shell)
        const speed = (Math.random() * 5 + 1) * velocityMultiplier; 
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        // Varying decay for natural fade out
        this.decay = Math.random() * 0.015 + 0.005;
        this.size = Math.random() * 2 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= FRICTION; // Air resistance
        this.vy *= FRICTION;
        this.vy += GRAVITY;  // Gravity pulling down
        this.alpha -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Rocket {
      x: number;
      y: number;
      vy: number;
      vx: number;
      color: string[];
      exploded: boolean;
      trail: {x: number, y: number}[];

      constructor() {
        this.x = (Math.random() * 0.6 + 0.2) * width; // Spawn in middle 60% of screen
        this.y = height;
        this.vy = -(Math.random() * 6 + 12); // Launch velocity
        this.vx = (Math.random() - 0.5) * 3; // Horizontal drift
        this.color = PALETTES[Math.floor(Math.random() * PALETTES.length)];
        this.exploded = false;
        this.trail = [];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += GRAVITY;
        
        // Keep last 8 positions for trail
        this.trail.push({x: this.x, y: this.y});
        if (this.trail.length > 8) this.trail.shift();

        // Explode when upward momentum is lost
        if (this.vy >= -1.5) {
          this.explode();
        }
      }

      explode() {
        this.exploded = true;
        
        // 1. Flash Effect: Light up the whole screen momentarily
        ctx!.globalCompositeOperation = 'lighter';
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx!.fillRect(0, 0, width, height);

        // 2. Main Particles
        for (let i = 0; i < PARTICLES_PER_EXPLOSION; i++) {
          const color = this.color[Math.floor(Math.random() * this.color.length)];
          particles.push(new Particle(this.x, this.y, color));
        }
        
        // 3. Bright Core Particles (Faster, White)
        for (let i = 0; i < 40; i++) {
             particles.push(new Particle(this.x, this.y, '#FFFFFF', 1.5));
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.exploded) return;
        
        // Draw Rocket Trail
        ctx.globalAlpha = 1;
        ctx.beginPath();
        if (this.trail.length > 1) {
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for (let p of this.trail) {
                ctx.lineTo(p.x, p.y);
            }
        }
        // Gradient Trail
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.vx*10, this.y - this.vy*10);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Head
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let animationFrameId: number;
    let startTime = Date.now();
    let spawning = true;

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];

    const loop = () => {
      // Clear canvas with trail effect (creates smooth motion blur)
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Adjust opacity for trail length
      ctx.fillRect(0, 0, width, height);
      
      // Use lighter composition for glowing effect
      ctx.globalCompositeOperation = 'lighter';

      if (Date.now() - startTime > DURATION) {
        spawning = false;
      }

      // Randomly spawn rockets
      if (spawning && Math.random() < ROCKET_SPAWN_RATE) {
        rockets.push(new Rocket());
      }

      // Update & Draw Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw(ctx);
        if (rockets[i].exploded) {
          rockets.splice(i, 1);
        }
      }

      // Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      // Cleanup check
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