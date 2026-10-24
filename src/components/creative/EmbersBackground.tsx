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

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition for glowing forge embers
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
      'rgba(230, 184, 74, ',  // Amber Gold
      'rgba(245, 199, 93, ',  // Bright Gold
      'rgba(255, 138, 43, ',  // Forge Orange
      'rgba(239, 68, 68, ',   // Deep Ember Red
    ];

    const embers: Ember[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.7 + 0.2,
      fadeSpeed: Math.random() * 0.006 + 0.002,
      color: emberColors[Math.floor(Math.random() * emberColors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const ember of embers) {
        ember.y += ember.speedY;
        ember.x += ember.speedX + Math.sin(ember.y * 0.01) * 0.3;
        ember.opacity -= ember.fadeSpeed;

        if (ember.opacity <= 0 || ember.y < 0) {
          ember.y = height + 10;
          ember.x = Math.random() * width;
          ember.opacity = Math.random() * 0.7 + 0.3;
          ember.size = Math.random() * 2.5 + 0.8;
        }

        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fillStyle = `${ember.color}${ember.opacity})`;
        ctx.shadowBlur = ember.size * 4;
        ctx.shadowColor = '#E6B84A';
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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 mix-blend-screen"
    />
  );
}
