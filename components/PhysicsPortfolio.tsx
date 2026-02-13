"use client";

import { useEffect, useRef } from 'react';
// @ts-ignore
import Matter from 'matter-js';

const PhysicsPortfolio = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());

  useEffect(() => {
    if (!sceneRef.current) return;

    engineRef.current.gravity.y = 0; 
    const width = sceneRef.current.offsetWidth;
    const height = sceneRef.current.offsetHeight;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engineRef.current,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
      },
    });

    // --- SETUP OBJEK ---
    const wallOptions = { isStatic: true, render: { visible: false }, restitution: 1 };
    const ground = Matter.Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -25, width, 50, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions);

    const createWord = (x: number, y: number, text: string) => {
      return Matter.Bodies.rectangle(x, y, text.length * 35, 50, {
        restitution: 0.8, frictionAir: 0.03, render: { fillStyle: 'transparent' }, label: text
      });
    };

    const createPng = (x: number, y: number, imgPath: string) => {
      return Matter.Bodies.rectangle(x, y, 70, 70, {
        restitution: 0.8, frictionAir: 0.03,
        render: { sprite: { texture: imgPath, xScale: 0.18, yScale: 0.18 } }
      });
    };

    const port = createWord(width * 0.3, height * 0.4, "PORT");
    const fo = createWord(width * 0.5, height * 0.5, "FO");
    const lio = createWord(width * 0.7, height * 0.6, "LIO");
    const png1 = createPng(width * 0.2, height * 0.2, "/sticker1.png"); 
    const png2 = createPng(width * 0.8, height * 0.3, "/sticker2.png");
    const png3 = createPng(width * 0.5, height * 0.8, "/sticker3.png");

    const allObjects = [port, fo, lio, png1, png2, png3];

    // --- FITUR SHAKE (Goyang HP) ---
    const handleMotion = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      // Ambang batas goyangan (sensitivitas)
      const threshold = 15; 
      if (Math.abs(acc.x || 0) > threshold || Math.abs(acc.y || 0) > threshold) {
        allObjects.forEach(body => {
          Matter.Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.1, // Beri dorongan acak x
            y: (Math.random() - 0.5) * 0.1  // Beri dorongan acak y
          });
        });
      }
    };

    // Minta izin sensor di iOS (iPhone perlu izin manual)
    if (typeof DeviceMotionEvent !== 'undefined' && typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      // Tombol trigger biasanya diperlukan untuk iOS, tapi kita coba pasang listener dulu
      window.addEventListener('devicemotion', handleMotion);
    } else {
      window.addEventListener('devicemotion', handleMotion);
    }

    // --- MOUSE & RENDER ---
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engineRef.current, {
      mouse, constraint: { stiffness: 0.1, render: { visible: false } }
    });

    Matter.Composite.add(engineRef.current.world, [
      ground, ceiling, leftWall, rightWall, ...allObjects, mouseConstraint
    ]);

    Matter.Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      if (!ctx) return;
      ctx.font = '900 50px Inter, sans-serif';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      [port, fo, lio].forEach((body) => {
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.fillText(body.label, 0, 15);
        ctx.restore();
      });
    });

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engineRef.current);
    Matter.Render.run(render);

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engineRef.current);
      if (render.canvas) render.canvas.remove();
    };
  }, []);

  return <div ref={sceneRef} className="absolute inset-0 w-full h-full z-10 touch-none" />;
};

export default PhysicsPortfolio;