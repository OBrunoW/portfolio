import { useState, useRef, useCallback } from "react";

function isGooglePlayUrl(url) {
  return url.includes("play.google.com");
}

export default function ProjectCard({ project }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hover, setHover] = useState(false);
  const glowRef = useRef(null);

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ rx: (py - 0.5) * -8, ry: (px - 0.5) * 8 });
    if (glowRef.current) {
      glowRef.current.style.left = `${px * 100}%`;
      glowRef.current.style.top = `${py * 100}%`;
    }
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ rx: 0, ry: 0 }); }}
      style={{
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        transform: hover
          ? `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.015)`
          : "perspective(700px) rotateX(0) rotateY(0) scale(1)",
        transition: hover ? "transform 0.08s linear" : "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, borderRadius: 22,
        background: "linear-gradient(160deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.6) 100%)",
        backdropFilter: "blur(28px)",
        border: `1px solid ${hover ? project.accent + "35" : "rgba(148,163,184,0.07)"}`,
        transition: "border-color 0.4s",
      }} />

      <div
        ref={glowRef}
        style={{
          position: "absolute", width: 260, height: 260, borderRadius: "50%",
          background: `radial-gradient(circle, ${project.accent}12 0%, transparent 70%)`,
          transform: "translate(-50%,-50%)", pointerEvents: "none",
          opacity: hover ? 1 : 0, transition: "opacity 0.3s", filter: "blur(30px)",
        }}
      />

      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${project.accent}60, transparent 80%)`,
        opacity: hover ? 1 : 0.35, transition: "opacity 0.4s",
      }} />

      <div style={{ position: "relative", zIndex: 2, padding: "30px 30px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%", background: project.accent,
                boxShadow: `0 0 10px ${project.accent}90`,
              }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: project.accent,
                letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
              }}>
                {project.category === "backend" ? "Backend" : "Mobile"}
              </span>
            </div>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700,
              color: "#F1F5F9", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.15,
            }}>
              {project.title}
            </h3>
          </div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            color: "rgba(148,163,184,0.4)", whiteSpace: "nowrap", marginTop: 6,
          }}>
            {project.period}
          </span>
        </div>

        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
          color: "rgba(148,163,184,0.5)", margin: "0 0 16px", letterSpacing: "0.02em",
        }}>
          {project.role} · {project.company}
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.75,
          color: "rgba(203,213,225,0.75)", margin: "0 0 20px",
        }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 18 }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "3px 9px",
              borderRadius: 5, background: "rgba(148,163,184,0.05)",
              color: "rgba(148,163,184,0.5)", border: "1px solid rgba(148,163,184,0.06)",
            }}>{t}</span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div style={{
            display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 18,
            borderTop: "1px solid rgba(148,163,184,0.06)",
          }}>
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600,
                  color: isGooglePlayUrl(l.url) ? "#0F172A" : project.accent,
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                  padding: isGooglePlayUrl(l.url) ? "11px 22px" : "11px 20px",
                  borderRadius: 10,
                  background: isGooglePlayUrl(l.url)
                    ? `linear-gradient(135deg, ${project.accent}, ${project.accent}CC)`
                    : "rgba(148,163,184,0.04)",
                  border: isGooglePlayUrl(l.url) ? "none" : `1.5px solid ${project.accent}30`,
                  boxShadow: isGooglePlayUrl(l.url) ? `0 4px 18px ${project.accent}30` : "none",
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  if (isGooglePlayUrl(l.url)) {
                    e.currentTarget.style.boxShadow = `0 8px 32px ${project.accent}50`;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  } else {
                    e.currentTarget.style.background = `${project.accent}12`;
                    e.currentTarget.style.borderColor = `${project.accent}55`;
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (isGooglePlayUrl(l.url)) {
                    e.currentTarget.style.boxShadow = `0 4px 18px ${project.accent}30`;
                    e.currentTarget.style.transform = "translateY(0)";
                  } else {
                    e.currentTarget.style.background = "rgba(148,163,184,0.04)";
                    e.currentTarget.style.borderColor = `${project.accent}30`;
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {isGooglePlayUrl(l.url) ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                )}
                {isGooglePlayUrl(l.url) ? "Google Play" : l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
