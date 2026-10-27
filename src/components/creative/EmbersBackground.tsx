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

    // Premium culinary embers: golden butter sparks & glacier mist
    const emberColors = [
      'rgba(217, 144, 54, ',   // Golden Butter Sizzle
      'rgba(255, 236, 210, ',  // Warm Champagne Cream Glow
      'rgba(230, 163, 71, ',   // Crisp Caramel Amber
      'rgba(155, 193, 217, ',  // Riviera Mist
    ];

    // 28 subtle culinary particles for smooth 60fps GPU performance
    const embers: Ember[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3.2 + 1.2,
      speedY: -(Math.random() * 0.5 + 0.15),
      speedX: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.45 + 0.15,
      fadeSpeed: Math.random() * 0.003 + 0.001,
      color: emberColors[Math.floor(Math.random() * emberColors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const ember of embers) {
        ember.y += ember.speedY;
        ember.x += ember.speedX + Math.sin(ember.y * 0.008) * 0.25;
        ember.opacity -= ember.fadeSpeed;

        if (ember.opacity <= 0 || ember.y < 0) {
          ember.y = height + 10;
          ember.x = Math.random() * width;
          ember.opacity = Math.random() * 0.45 + 0.15;
          ember.size = Math.random() * 3.2 + 1.2;
        }

        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fillStyle = `${ember.color}${ember.opacity})`;
        ctx.shadowBlur = ember.size * 4;
        ctx.shadowColor = 'rgba(217, 144, 54, 0.45)';
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
