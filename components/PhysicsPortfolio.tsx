"use client";

import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const PhysicsPortfolio = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());

  useEffect(() => {
    if (!sceneRef.current) return;

    // 1. MATIKAN GRAVITASI
    // Ini rahasianya agar objek ngambang
    engineRef.current.gravity.y = 0; 

    const width = sceneRef.current.offsetWidth;
    const height = sceneRef.current.offsetHeight;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engineRef.current,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
      },
    });

    // 2. DINDING PEMBATAS (Tetap perlu agar objek tidak melayang keluar layar)
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false },
      restitution: 1 // Biar kalau mentok dinding, dia mantul balik
    };
    const ground = Matter.Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -25, width, 50, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions);

    // 3. FUNGSI OBJEK DENGAN HAMBATAN UDARA RENDAH (Air Friction)
    const createWord = (x: number, y: number, text: string) => {
      return Matter.Bodies.rectangle(x, y, text.length * 40, 60, {
        restitution: 0.9,
        frictionAir: 0.02, // Memberikan sedikit efek 'melayang di air'
        render: { fillStyle: 'transparent' },
        label: text
      });
    };

    const createPng = (x: number, y: number, imgPath: string, scale: number = 0.5) => {
      return Matter.Bodies.rectangle(x, y, 80, 80, {
        restitution: 0.9,
        frictionAir: 0.02,
        render: {
          sprite: {
            texture: imgPath,
            xScale: scale,
            yScale: scale,
          }
        }
      });
    };

    // --- SPAWN OBJEK DI POSISI ACAK ---
    const port = createWord(width * 0.3, height * 0.4, "PORT");
    const fo = createWord(width * 0.5, height * 0.5, "FO");
    const lio = createWord(width * 0.7, height * 0.6, "LIO");

    const png1 = createPng(width * 0.2, height * 0.2, "/sticker1.png", 0.2); 
    const png2 = createPng(width * 0.8, height * 0.3, "/sticker2.png", 0.2);
    const png3 = createPng(width * 0.5, height * 0.8, "/sticker3.png", 0.2);

    // 4. BERIKAN SEDIKIT DORONGAN AWAL (Biar langsung gerak pas load)
    [port, fo, lio, png1, png2, png3].forEach(body => {
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
      });
    });

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engineRef.current, {
      mouse: mouse,
      constraint: { stiffness: 0.1, render: { visible: false } }
    });
    render.mouse = mouse;

    Matter.Composite.add(engineRef.current.world, [
      ground, ceiling, leftWall, rightWall, 
      port, fo, lio, 
      png1, png2, png3, 
      mouseConstraint
    ]);

    Matter.Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      if (!ctx) return;
      ctx.font = '900 70px Inter, system-ui, sans-serif';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      [port, fo, lio].forEach((body) => {
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.fillText(body.label, 0, 0);
        ctx.restore();
      });
    });

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engineRef.current);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engineRef.current);
      render.canvas.remove();
    };
  }, []);

  return <div ref={sceneRef} className="absolute inset-0 w-full h-full z-10 touch-none" />;
};

export default PhysicsPortfolio;