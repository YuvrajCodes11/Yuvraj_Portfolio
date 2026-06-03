import React, { useEffect, useRef } from 'react';

export default function MatrixCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];

    const charSequence = '01ABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';

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

        // Re-calculate columns
        const fontSize = 14;
        columns = Math.floor(width / fontSize);
        drops = Array(columns).fill(0).map(() => Math.random() * -100);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let lastDrawTime = 0;
    const fpsInterval = 1000 / 22; // Cap frame-rate to 22 fps to look retro or low-cpu

    const draw = (timestamp: number) => {
      animationId = requestAnimationFrame(draw);

      if (timestamp - lastDrawTime < fpsInterval) return;
      lastDrawTime = timestamp;

      // Soft trail
      ctx.fillStyle = 'rgba(250, 249, 246, 0.16)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(42, 42, 42, 0.6)';
      ctx.font = '12px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = charSequence[Math.floor(Math.random() * charSequence.length)];
        const x = i * 14;
        const y = drops[i] * 14;

        if (y > 0) {
          // Glow and highlighted lead characters
          const randomHighlight = Math.random() > 0.96;
          ctx.fillStyle = randomHighlight ? '#1a1a1a' : 'rgba(191, 188, 179, 0.7)';
          ctx.fillText(text, x, y);
        }

        if (y > height && Math.random() > 0.935) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div id="matrix-canvas-container" ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-20">
      <canvas id="matrix-canvas" ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
