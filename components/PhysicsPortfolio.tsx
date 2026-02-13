"use client";

import { useEffect, useRef } from 'react';
// @ts-ignore
import Matter from 'matter-js';

const PhysicsPortfolio = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());

  useEffect(() => {
    if (!sceneRef.current) return;

    // Matikan gravitasi standar (karena akan kita kendalikan lewat sensor)
    engineRef.current.gravity.y = 0; 
    engineRef.current.gravity.x = 0;

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

    // --- SETUP BOUNDARIES (Dinding agar tidak keluar layar) ---
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false },
      restitution: 0.8 // Efek pantulan saat kena dinding
    };
    const ground = Matter.Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -25, width, 50, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions);

    // --- FUNGSI PEMBUAT OBJEK ---
    const createWord = (x: number, y: number, text: string) => {
      return Matter.Bodies.rectangle(x, y, text.length * 35, 50, {
        restitution: 0.6,
        frictionAir: 0.05,
        render: { fillStyle: 'transparent' },
        label: text
      });
    };

    const createPng = (x: number, y: number, imgPath: string) => {
      return Matter.Bodies.rectangle(x, y, 70, 70, {
        restitution: 0.6,
        frictionAir: 0.05,
        render: {
          sprite: {
            texture: imgPath,
            xScale: 0.18,
            yScale: 0.18,
          }
        }
      });
    };

    // --- DAFTAR OBJEK ---
    const allObjects = [
      createWord(width * 0.3, height * 0.4, "PORT"),
      createWord(width * 0.5, height * 0.5, "FO"),
      createWord(width * 0.7, height * 0.6, "LIO"),
      createPng(width * 0.2, height * 0.2, "/sticker1.png"), 
      createPng(width * 0.8, height * 0.3, "/sticker2.png"),
      createPng(width * 0.5, height * 0.8, "/sticker3.png")
    ];

    // --- LOGIKA TILT (Kemiringan HP) ---
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Gamma: Kiri/Kanan (-90 s/d 90)
      // Beta: Atas/Bawah (-180 s/d 180)
      const xGravity = (event.gamma || 0) / 30; // Sensitivitas horizontal
      const yGravity = (event.beta || 0) / 30;  // Sensitivitas vertikal

      engineRef.current.gravity.x = xGravity;
      engineRef.current.gravity.y = yGravity;
    };

    // Fungsi untuk meminta izin sensor (Wajib untuk iOS/iPhone)
    const requestPermission = () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((permissionState: string) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    // Sensor aktif setelah user berinteraksi dengan layar
    window.addEventListener('click', requestPermission, { once: true });
    window.addEventListener('touchstart', requestPermission, { once: true });

    // --- INTERAKSI MOUSE / TOUCH ---
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engineRef.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    // Masukkan semua ke dunia fisik
    Matter.Composite.add(engineRef.current.world, [
      ground, ceiling, leftWall, rightWall, 
      ...allObjects, 
      mouseConstraint
    ]);

    // Loop Rendering untuk Teks
    Matter.Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      if (!ctx) return;
      
      ctx.font = '900 50px Inter, system-ui, sans-serif';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      allObjects.forEach((body) => {
        if (body.label) {
          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);
          ctx.fillText(body.label, 0, 0);
          ctx.restore();
        }
      });
    });

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engineRef.current);
    Matter.Render.run(render);

    // Clean up saat komponen dilepas
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('click', requestPermission);
      window.removeEventListener('touchstart', requestPermission);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engineRef.current);
      if (render.canvas) render.canvas.remove();
    };
  }, []);

  return <div ref={sceneRef} className="absolute inset-0 w-full h-full z-10 touch-none" />;
};

export default PhysicsPortfolio;