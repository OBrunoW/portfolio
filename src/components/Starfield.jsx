import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight * 5);
    };
    resize();

    const NUM = 400;
    const stars = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      alpha: Math.random() * 0.55 + 0.15,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.002,
      drift: (Math.random() - 0.5) * 0.08,
    }));

    let t = 0;
    let raf;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        s.x += s.drift;
        if (s.x < -2) s.x = canvas.width + 2;
        if (s.x > canvas.width + 2) s.x = -2;

        const flicker = (Math.sin(t * s.speed * 2.5 + s.phase) + 1) / 2;
        const a = s.alpha * (0.5 + flicker * 0.5);

        ctx.beginPath();
        ctx.arc(s.x, s.y + Math.sin(s.phase + t * s.speed) * 0.6, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,210,255,${a})`;
        ctx.fill();

        if (s.r > 1.1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(140,180,255,${a * 0.06})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    const obs = new ResizeObserver(resize);
    obs.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
      />
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "28vh", pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to bottom, rgba(6,10,20,0.95) 0%, rgba(6,10,20,0.5) 40%, transparent 100%)",
      }} />
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: "28vh", pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to top, rgba(6,10,20,0.95) 0%, rgba(6,10,20,0.5) 40%, transparent 100%)",
      }} />
      <div style={{
        position: "fixed", top: 0, bottom: 0, left: 0, width: "12vw", pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to right, rgba(6,10,20,0.8) 0%, transparent 100%)",
      }} />
      <div style={{
        position: "fixed", top: 0, bottom: 0, right: 0, width: "12vw", pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to left, rgba(6,10,20,0.8) 0%, transparent 100%)",
      }} />
    </>
  );
}
