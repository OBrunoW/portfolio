import { useState, useEffect, useRef } from "react";
import { projects, skillGroups, timeline } from "./data/portfolioData";
import Starfield from "./components/Starfield";
import ProjectCard from "./components/ProjectCard";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: -200, y: -200 });
  const cRef = useRef(null);

  useEffect(() => {
    const el = cRef.current;
    if (!el) return;
    const fn = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div
      ref={cRef}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #060A14 0%, #0A1228 25%, #0C1630 50%, #080E1E 100%)",
        color: "#F1F5F9",
        fontFamily: "'Inter', sans-serif",
        overflowY: "auto", overflowX: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 5px }
        ::-webkit-scrollbar-track { background: transparent }
        ::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.12); border-radius: 3px }
        html, body, #root { height: 100%; overflow: auto; }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <Starfield />

      <div
        style={{
          position: "fixed",
          left: mouse.x,
          top: mouse.y,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(120,160,220,0.07) 0%, rgba(80,130,200,0.03) 30%, transparent 65%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 1,
          filter: "blur(8px)",
          transition: "left 0.08s linear, top 0.08s linear",
          willChange: "left, top",
        }}
      />

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrollY > 60 ? "rgba(6,10,20,0.85)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(148,163,184,0.05)" : "none",
        transition: "all 0.4s",
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 600, color: "#F1F5F9" }}>
          bruno<span style={{ color: "#38BDF8" }}>.</span>santos
        </span>
        <div style={{ display: "flex", gap: 28 }}>
          {["Projetos", "Skills", "Contato"].map((s) => (
            <a key={s} href={`#${s.toLowerCase()}`} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "rgba(148,163,184,0.5)", textDecoration: "none", letterSpacing: "0.06em",
              transition: "color 0.2s",
            }}
              onMouseEnter={(e) => (e.target.style.color = "#F1F5F9")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(148,163,184,0.5)")}
            >{s}</a>
          ))}
        </div>
      </nav>

      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 52px", position: "relative", zIndex: 2 }}>
        <div style={{ position: "absolute", top: "12%", right: "6%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "18%", left: "10%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 660, position: "relative", zIndex: 2, animation: "fadeUp 0.9s ease-out" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(148,163,184,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20, lineHeight: 1.8 }}>
            Backend Engineer<br/>
            <span style={{ color: "rgba(56,189,248,0.4)" }}>Go · Distributed Systems · APIs</span><br/>
            Joinville, SC — Brazil
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(40px, 6vw, 70px)",
            fontWeight: 700, lineHeight: 1.05, margin: "0 0 24px", letterSpacing: "-0.035em",
            background: "linear-gradient(135deg, #F1F5F9 30%, #94A3B8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Bruno Santos</h1>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(203,213,225,0.65)", maxWidth: 560, margin: "0 0 12px", fontWeight: 300 }}>
            Desenvolvedor Backend focado em <span style={{ color: "#38BDF8", fontWeight: 500 }}>Go</span>,{" "}
            <span style={{ color: "#38BDF8", fontWeight: 500 }}>microserviços</span> e{" "}
            <span style={{ color: "#38BDF8", fontWeight: 500 }}>sistemas escaláveis</span>, com experiência em integração de sistemas, automação de processos e arquitetura de APIs.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(148,163,184,0.5)", maxWidth: 560, margin: "0 0 36px" }}>
            Minha trajetória começou com sistemas embarcados e eletrônica na Engenharia Mecatrônica na UFSC, o que ainda hoje influencia meu interesse por hardware, firmware e IIoT. Depois atuei por quase 3 anos no desenvolvimento mobile (Flutter e Android), até migrar definitivamente para backend, onde hoje trabalho projetando APIs, automações e integrações que sustentam operações reais de empresas industriais e e-commerce.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="https://linkedin.com/in/brunowsantos" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, padding: "12px 28px", borderRadius: 10, color: "rgba(148,163,184,0.65)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(148,163,184,0.12)" }}>LinkedIn ↗</a>
            <a href="https://github.com/OBrunoW" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, padding: "12px 28px", borderRadius: 10, color: "rgba(148,163,184,0.65)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(148,163,184,0.12)" }}>GitHub ↗</a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.25 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#94A3B8", letterSpacing: "0.15em" }}>SCROLL</span>
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(148,163,184,0.4), transparent)" }} />
        </div>
      </section>

      <section id="projetos" style={{ padding: "100px 40px 60px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#38BDF8", letterSpacing: "0.15em", textTransform: "uppercase" }}>Portfólio</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 700, margin: "8px 0 20px", letterSpacing: "-0.025em" }}>Projetos</h2>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ k: "all", l: "Todos" }, { k: "backend", l: "Backend" }, { k: "mobile", l: "Mobile" }].map((f) => (
                <button key={f.k} type="button" onClick={() => setFilter(f.k)} style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12, padding: "7px 18px",
                  borderRadius: 8, cursor: "pointer", transition: "all 0.25s",
                  border: `1px solid ${filter === f.k ? "#38BDF8" : "rgba(148,163,184,0.08)"}`,
                  background: filter === f.k ? "rgba(56,189,248,0.1)" : "transparent",
                  color: filter === f.k ? "#38BDF8" : "rgba(148,163,184,0.45)",
                }}>{f.l}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 500px), 1fr))", gap: 28 }}>
            {filtered.map((p, i) => (
              <div key={p.id} style={{ animation: `fadeUp 0.5s ease-out ${i * 0.1}s both` }}>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" style={{ padding: "90px 40px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#38BDF8", letterSpacing: "0.15em", textTransform: "uppercase" }}>Stack</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 700, margin: "8px 0 40px", letterSpacing: "-0.025em" }}>Habilidades & Tecnologias</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: 14 }}>
            {Object.entries(skillGroups).map(([cat, items]) => (
              <div key={cat} style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(148,163,184,0.06)", borderRadius: 14, padding: "18px 22px" }}>
                <h4 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(148,163,184,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px", fontWeight: 500 }}>{cat}</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {items.map((item) => (
                    <span key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(203,213,225,0.6)", padding: "3px 10px", background: "rgba(148,163,184,0.05)", borderRadius: 5 }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "90px 40px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#38BDF8", letterSpacing: "0.15em", textTransform: "uppercase" }}>Evolução</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 700, margin: "8px 0 40px", letterSpacing: "-0.025em" }}>Trajetória</h2>
          <div style={{ position: "relative", paddingLeft: 40 }}>
            <div style={{ position: "absolute", left: 8, top: 8, bottom: 8, width: 1, background: "linear-gradient(to bottom, #38BDF8, rgba(56,189,248,0.04))" }} />
            {timeline.map((it, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 32, position: "relative" }}>
                <div style={{ position: "absolute", left: -36, top: 5, width: 10, height: 10, borderRadius: "50%", background: it.type === "education" ? "#A78BFA" : "#38BDF8", border: "2px solid #0A1228", boxShadow: `0 0 10px ${it.type === "education" ? "#A78BFA" : "#38BDF8"}40` }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#38BDF8", fontWeight: 600, minWidth: 48 }}>{it.year}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(203,213,225,0.6)" }}>{it.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" style={{ padding: "90px 40px 130px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#38BDF8", letterSpacing: "0.15em", textTransform: "uppercase" }}>Contato</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 700, margin: "8px 0 36px", letterSpacing: "-0.025em" }}>Vamos conversar?</h2>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[
              { label: "brunowilsoneng@gmail.com", url: "mailto:brunowilsoneng@gmail.com", icon: "✉" },
              { label: "LinkedIn", url: "https://linkedin.com/in/brunowsantos", icon: "↗" },
              { label: "GitHub", url: "https://github.com/OBrunoW", icon: "↗" },
              { label: "(47) 99981-1726", url: "tel:+5547999811726", icon: "☎" },
            ].map((c) => (
              <a key={c.url} href={c.url} target={c.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "12px 22px",
                  borderRadius: 12, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(148,163,184,0.07)", color: "rgba(148,163,184,0.6)",
                  textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)"; e.currentTarget.style.color = "#38BDF8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(148,163,184,0.07)"; e.currentTarget.style.color = "rgba(148,163,184,0.6)"; }}
              ><span>{c.icon}</span>{c.label}</a>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ padding: "24px 40px", borderTop: "1px solid rgba(148,163,184,0.04)", textAlign: "center", position: "relative", zIndex: 2 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(148,163,184,0.18)" }}>© 2026 Bruno Santos · Joinville, SC</span>
      </footer>
    </div>
  );
}
