// C:\Users\LENOVO\Documents\cerita-app\src\components\game\MitosDestroyer.tsx

"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { cn } from "@/lib/utils";

export default function MitosDestroyer() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // 1. Inisialisasi Engine & Runner
    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();
    
    engineRef.current = engine;
    runnerRef.current = runner;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 500,
        wireframes: false, // Memunculkan warna solid
        background: "#FFF000", // Kuning cerah Y2K
      },
    });

    // 2. Buat Objek Fisika Dasar (Lantai)
    const ground = Matter.Bodies.rectangle(400, 490, 810, 40, {
      isStatic: true,
      render: { fillStyle: "#000000" }, // Lantai hitam brutalist
    });

    // 3. Buat Peluru Fakta (Diposisikan di area ketapel sebelah kiri)
    const peluruFakta = Matter.Bodies.circle(150, 350, 20, {
      density: 0.004, // Berat peluru agar momentum dorongannya pas
      restitution: 0.4, // Sedikit membal saat jatuh nanti
      render: { fillStyle: "#FF2D78" }, // Warna pink khas CERITA
    });

    // 4. Pasang Karet Ketapel (Constraint)
    // Mengikat titik koordinat (150, 350) ke objek peluruFakta
    const slingshot = Matter.Constraint.create({
      pointA: { x: 150, y: 350 }, // Titik jangkar ketapel
      bodyB: peluruFakta,
      stiffness: 0.05, // Tingkat keelastisan karet (makin kecil makin melar)
      damping: 0.1, // Mengurangi efek osilasi berlebih
      render: {
        strokeStyle: "#000000", // Garis karet berwarna hitam tebal
        lineWidth: 5,
      },
    });

    // 5. Tambahkan Kontrol Mouse / Touch
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }, // Sembunyikan garis bantu pointer mouse asli
      },
    });

    // 6. Logika Melepas Tembakan (Angry Birds Mechanics)
    // Ketika user melepas klik setelah menarik bola, putus karet ketapelnya!
    Matter.Events.on(mouseConstraint, "enddrag", (event: any) => {
      if (event.body === peluruFakta) {
        // Beri delay 20ms agar peluru mendapatkan gaya dorong (momentum) ke depan sebelum karetnya dilepas
        setTimeout(() => {
          slingshot.bodyB = null; // Putus ikatan karet ketapel, peluru melesat bebas!
        }, 20);
      }
    });

    // 7. Masukkan semua objek ke dalam Dunia (World)
    Matter.World.add(engine.world, [
      ground, 
      peluruFakta, 
      slingshot, 
      mouseConstraint
    ]);

    // Menjaga agar interaksi mouse sinkron dengan canvas rendering
    render.mouse = mouse;

    // 8. Jalankan Game & Fisika
    Matter.Render.run(render);
    Matter.Runner.run(runner, engine);

    // 9. Cleanup saat komponen unmount
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      if (render.canvas) {
        render.canvas.remove();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-black dark:text-white">
          Mitos Destroyer
        </h2>
        <p className="text-sm font-bold text-black/60 dark:text-white/60">
          Fase 2: Tarik &amp; Tembak (Mekanik Ketapel)
        </p>
      </div>

      {/* Wadah Canvas dengan kursor tangan mengepal saat ditarik */}
      <div
        ref={sceneRef}
        className={cn(
          "overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing",
          "border-4 border-black dark:border-white",
          "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)]"
        )}
      />

      <p className="text-xs font-black uppercase tracking-widest mt-4 text-black/50 dark:text-white/40 animate-bounce">
        💡 Petunjuk: Klik dan tarik bola pink ke belakang, lalu lepaskan!
      </p>
    </div>
  );
}