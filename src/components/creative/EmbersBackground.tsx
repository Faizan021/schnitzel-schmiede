'use client';

import React, { useEffect, useRef } from 'react';

export function EmbersBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition for soft ambient luxury mist & light bokeh
    interface Ember {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
    }

    const emberColors = [
      'rgba(155, 193, 217, ',  // Glacier Blue (BebeQ)
      'rgba(184, 212, 232, ',  // Frosted Sky Blue
      'rgba(255, 236, 210, ',  // Warm Champagne Light
      'rgba(204, 227, 241, ',  // Soft Powder Mist
    ];

    // Subtle 20 particle count to keep CPU load near 0% and prevent visual noise
    const embers: Ember[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3.5 + 1.2,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.35 + 0.1,
      fadeSpeed: Math.random() * 0.003 + 0.001,
      color: emberColors[Math.floor(Math.random() * emberColors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const ember of embers) {
        ember.y += ember.speedY;
        ember.x += ember.speedX + Math.sin(ember.y * 0.005) * 0.2;
        ember.opacity -= ember.fadeSpeed;

        if (ember.opacity <= 0 || ember.y < 0) {
          ember.y = height + 10;
          ember.x = Math.random() * width;
          ember.opacity = Math.random() * 0.35 + 0.1;
          ember.size = Math.random() * 3.5 + 1.2;
        }

        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fillStyle = `${ember.color}${ember.opacity})`;
        ctx.shadowBlur = ember.size * 3;
        ctx.shadowColor = 'rgba(155, 193, 217, 0.4)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-40"
    />
  );
}
