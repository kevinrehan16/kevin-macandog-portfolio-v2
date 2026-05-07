"use client";

import React, { useRef, useEffect } from "react";

const CyberGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;
    let beams: any[] = [];
    const mouse = { x: -1000, y: -1000 };
    const gridSize = 50; 

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    class Beam {
      x: number = 0;
      y: number = 0;
      velocity: number = 0;
      length: number = 0;
      isVertical: boolean = false;
      opacity: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.isVertical = Math.random() > 0.5;
        this.length = Math.random() * 200 + 100;
        this.velocity = Math.random() * 3 + 1.5;
        this.opacity = Math.random() * 0.6 + 0.2;

        if (this.isVertical) {
          this.x = Math.floor(Math.random() * (window.innerWidth / gridSize)) * gridSize;
          this.y = -this.length;
        } else {
          this.y = Math.floor(Math.random() * (window.innerHeight / gridSize)) * gridSize;
          this.x = -this.length;
        }
      }

      update() {
        if (this.isVertical) {
          this.y += this.velocity;
          if (this.y > window.innerHeight) this.reset();
        } else {
          this.x += this.velocity;
          if (this.x > window.innerWidth) this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        const color = "139, 92, 246"; 
        const gradient = this.isVertical 
          ? ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length)
          : ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y);

        gradient.addColorStop(0, `rgba(${color}, 0)`);
        gradient.addColorStop(0.5, `rgba(${color}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = gradient;
        if (this.isVertical) {
          ctx.fillRect(this.x, this.y, 1, this.length);
        } else {
          ctx.fillRect(this.x, this.y, this.length, 1);
        }
      }
    }

    const init = () => {
      beams = Array.from({ length: 20 }, () => new Beam());
    };

    const animate = () => {
      // Dito natin nise-set ang background color ng buong site
      ctx.fillStyle = "#030014"; 
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = "rgba(139, 92, 246, 0.08)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Cursor Glow
      const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 500);
      glow.addColorStop(0, "rgba(139, 92, 246, 0.15)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      beams.forEach(b => { b.update(); b.draw(); });
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener("resize", () => { resize(); init(); });

    resize();
    init();
    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 0, // Para nasa likod lang siya ng text
      }}
    />
  );
};

export default CyberGridBackground;