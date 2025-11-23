
import React, { useEffect, useRef } from 'react';

const SolarSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: (e.clientX - rect.left - canvas.width / 2) / (canvas.width / 2),
            y: (e.clientY - rect.top - canvas.height / 2) / (canvas.height / 2)
        };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ==========================================
    // CONFIGURATION & DATA
    // ==========================================
    // Distances are scaled relative to Earth (1 AU approx)
    // Sizes are logarithmic-ish for visibility
    // Speed is relative to Earth year
    const planets = [
      { name: "Mercury", dist: 60, size: 2.4, speed: 0.04, color: "#A5A5A5", shadow: "#5A5A5A", angle: Math.random() * 6 },
      { name: "Venus", dist: 95, size: 5.8, speed: 0.015, color: "#E3BB76", shadow: "#8B7355", angle: Math.random() * 6 },
      { name: "Earth", dist: 135, size: 6, speed: 0.01, color: "#22A6B3", shadow: "#104E55", angle: Math.random() * 6 },
      { name: "Mars", dist: 175, size: 3.2, speed: 0.008, color: "#FF6B6B", shadow: "#8B3A3A", angle: Math.random() * 6 },
      { name: "Jupiter", dist: 260, size: 18, speed: 0.002, color: "#DCC3A1", shadow: "#8B7D6B", angle: Math.random() * 6 },
      { name: "Saturn", dist: 340, size: 15, speed: 0.0015, color: "#F4E4BA", shadow: "#8B836B", angle: Math.random() * 6, ring: true },
      { name: "Uranus", dist: 400, size: 10, speed: 0.001, color: "#67E6DC", shadow: "#3A827D", angle: Math.random() * 6 },
      { name: "Neptune", dist: 450, size: 9.5, speed: 0.0008, color: "#30336B", shadow: "#191A36", angle: Math.random() * 6 },
    ];

    // Trail history buffer
    const trails: { x: number, y: number, z: number }[][] = planets.map(() => []);
    const MAX_TRAIL_LENGTH = 80;

    // Star field (3D coordinates)
    const stars: { x: number, y: number, z: number, size: number, alpha: number }[] = [];
    for(let i=0; i<600; i++) {
        stars.push({
            x: (Math.random() - 0.5) * 2000,
            y: (Math.random() - 0.5) * 2000,
            z: (Math.random() - 0.5) * 2000,
            size: Math.random() * 1.5,
            alpha: Math.random()
        });
    }

    let animationId: number;

    const render = () => {
      // Resize logic
      if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
      }
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      // Camera/View parameters
      // Base tilt is 75 degrees (almost flat), influenced by mouse Y
      const tilt = 0.2 + (mouseRef.current.y * 0.1); 
      // Rotation adds slight horizontal pan based on mouse X
      const rotation = mouseRef.current.x * 0.1;

      // Clear canvas with deep space fade
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Helper: 3D to 2D Projection
      const project = (x: number, y: number, z: number) => {
          // Apply rotation (yaw)
          const x1 = x * Math.cos(rotation) - z * Math.sin(rotation);
          const z1 = z * Math.cos(rotation) + x * Math.sin(rotation);
          
          // Apply tilt (pitch) - compress Y based on Z
          const y2 = y * Math.cos(tilt) - z1 * Math.sin(tilt);
          const z2 = z1 * Math.cos(tilt) + y * Math.sin(tilt);

          // Perspective projection
          // As Z gets negative (closer), scale increases. As Z gets positive (farther), scale decreases.
          const fov = 800;
          const scale = fov / (fov + z2);
          
          return {
              x: cx + x1 * scale,
              y: cy + y2 * scale,
              scale: scale,
              depth: z2 // Used for z-sorting
          };
      };

      // 1. Draw Background Stars (with parallax)
      stars.forEach(star => {
          const p = project(star.x, star.y, star.z);
          if (p.scale > 0) {
              ctx.globalAlpha = star.alpha * (p.scale * 0.8); // Far stars are dimmer
              ctx.fillStyle = '#FFF';
              ctx.beginPath();
              ctx.arc(p.x, p.y, star.size * p.scale, 0, Math.PI * 2);
              ctx.fill();
          }
      });
      ctx.globalAlpha = 1;

      // 2. Draw Sun (Center)
      // Sun glow
      const sunP = project(0, 0, 0);
      const sunGradient = ctx.createRadialGradient(sunP.x, sunP.y, 5 * sunP.scale, sunP.x, sunP.y, 60 * sunP.scale);
      sunGradient.addColorStop(0, 'rgba(255, 240, 200, 1)');
      sunGradient.addColorStop(0.2, 'rgba(253, 184, 19, 0.8)');
      sunGradient.addColorStop(0.5, 'rgba(253, 184, 19, 0.2)');
      sunGradient.addColorStop(1, 'rgba(253, 184, 19, 0)');
      
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(sunP.x, sunP.y, 60 * sunP.scale, 0, Math.PI * 2);
      ctx.fill();

      // Sun Core
      ctx.fillStyle = '#FFF8E7';
      ctx.beginPath();
      ctx.arc(sunP.x, sunP.y, 12 * sunP.scale, 0, Math.PI * 2);
      ctx.fill();

      // 3. Calculate & Sort Planets by Depth (Z-index)
      const renderList: any[] = [];

      planets.forEach((planet, i) => {
          planet.angle += planet.speed;

          // 3D Coordinates (x, 0, z) - Planets orbit on the XZ plane
          const x = Math.cos(planet.angle) * planet.dist;
          const z = Math.sin(planet.angle) * planet.dist;
          const y = 0;

          const p = project(x, y, z);

          // Update Trail
          trails[i].push({ x, y, z });
          if (trails[i].length > MAX_TRAIL_LENGTH) trails[i].shift();

          renderList.push({
              type: 'planet',
              ...p,
              planet,
              trail: trails[i],
              index: i
          });
      });

      // Sort: Draw furthest objects first (painter's algorithm)
      renderList.sort((a, b) => b.depth - a.depth);

      // 4. Render Loop
      renderList.forEach(obj => {
          const { x, y, scale, planet, trail } = obj;

          // --- Draw Trail ---
          // We draw trails segment by segment to handle opacity fading and correct Z-depth approximation
          if (trail.length > 1) {
              ctx.beginPath();
              ctx.lineCap = 'round';
              ctx.lineJoin = 'round';
              
              for (let j = 0; j < trail.length - 1; j++) {
                  const t1 = trail[j];
                  const t2 = trail[j+1];
                  
                  const p1 = project(t1.x, t1.y, t1.z);
                  const p2 = project(t2.x, t2.y, t2.z);

                  // Opacity increases towards the planet
                  const opacity = (j / trail.length) * 0.3;
                  ctx.strokeStyle = planet.color;
                  ctx.globalAlpha = opacity;
                  ctx.lineWidth = 1.5 * scale; // Trail thins with distance
                  
                  ctx.beginPath();
                  ctx.moveTo(p1.x, p1.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
              }
              ctx.globalAlpha = 1;
          }

          // --- Draw Saturn's Ring (Back part) ---
          if (planet.ring && Math.sin(planet.angle) < 0) { // Crude occlusion check
             drawRing(ctx, x, y, scale, planet.color);
          }

          // --- Draw Planet Body with Lighting ---
          const size = planet.size * scale;
          
          // Base circle
          ctx.fillStyle = planet.color;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();

          // Shadow shading (Spherical gradient)
          // The light comes from the center (Sun), so the shadow is on the opposite side relative to the screen
          const angleToSun = Math.atan2(y - sunP.y, x - sunP.x);
          
          const grad = ctx.createRadialGradient(
              x - Math.cos(angleToSun) * (size * 0.3), 
              y - Math.sin(angleToSun) * (size * 0.3), 
              size * 0.1, 
              x, y, size
          );
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.2)'); // Highlight facing sun
          grad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0.7)'); // Shadow on backside

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();

          // --- Draw Saturn's Ring (Front part) ---
          if (planet.ring && Math.sin(planet.angle) >= 0) {
             drawRing(ctx, x, y, scale, planet.color);
          }

          // Label (Only when closer to front)
          if (obj.depth < 0) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
              ctx.font = `400 ${Math.max(9, 10 * scale)}px Inter, sans-serif`;
              ctx.textAlign = 'center';
              ctx.fillText(planet.name, x, y + size + 10 * scale);
          }
      });

      animationId = requestAnimationFrame(render);
    };

    const drawRing = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, color: string) => {
        ctx.save();
        ctx.translate(x, y);
        // Tilt the ring a bit
        ctx.rotate(Math.PI / 8); 
        ctx.scale(1, 0.3); // Flatten to ellipse
        
        ctx.beginPath();
        ctx.arc(0, 0, 28 * scale, 0, Math.PI * 2);
        ctx.lineWidth = 4 * scale;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(0, 0, 24 * scale, 0, Math.PI * 2);
        ctx.lineWidth = 2 * scale;
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        
        ctx.restore();
        ctx.globalAlpha = 1;
    };

    render();

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#050508] relative overflow-hidden flex flex-col items-center justify-center cursor-move">
       <canvas ref={canvasRef} className="w-full h-full" />
       <div className="absolute top-6 left-6 text-white/40 text-[10px] font-mono tracking-widest pointer-events-none flex flex-col gap-1">
          <span>ORBITAL SIMULATION V2.0</span>
          <span>PARALLAX: ACTIVE</span>
          <span>LIGHTING: DYNAMIC</span>
       </div>
    </div>
  );
};

export default SolarSystem;
