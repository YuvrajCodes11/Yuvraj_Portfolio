import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }

    const particles: Particle[] = [];
    const maxParticles = 60;

    // Handle Resize using ResizeObserver
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = entryWidth;
        height = entryHeight;
        canvas.width = entryWidth * window.devicePixelRatio;
        canvas.height = entryHeight * window.devicePixelRatio;
        canvas.style.width = `${entryWidth}px`;
        canvas.style.height = `${entryHeight}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
      initParticles();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          color: i % 3 === 0 ? 'rgba(26, 26, 26, 0.18)' : i % 3 === 1 ? 'rgba(191, 188, 179, 0.5)' : 'rgba(163, 163, 163, 0.3)',
        });
      }
    };

    let mouseX = 0;
    let mouseY = 0;
    let isMouseIn = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseEnter = () => {
      isMouseIn = true;
    };

    const onMouseLeave = () => {
      isMouseIn = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 110) * 0.12;
            ctx.strokeStyle = `rgba(42, 42, 42, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw cursor connection
        if (isMouseIn) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 130) * 0.2;
            ctx.strokeStyle = `rgba(163, 163, 163, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div id="particle-canvas-container" ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <canvas id="particle-canvas" ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
