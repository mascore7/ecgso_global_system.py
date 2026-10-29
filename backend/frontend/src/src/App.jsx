import { useState } from "react";

const capabilities = [
  {
    number: "01",
    title: "Sovereign AI",
    description:
      "A foundation for controlled AI integration, model routing, and owner-governed execution.",
  },
  {
    number: "02",
    title: "Zero-Trust Security",
    description:
      "A security-first architecture built around identity verification, access policies, and controlled requests.",
  },
  {
    number: "03",
    title: "Auditable Infrastructure",
    description:
      "A foundation for recording system decisions and verifying operational evidence.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <style>{`
        :root {
          color-scheme: dark;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #080d18;
          color: #f3f6ff;
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }

        * { box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        body {
          margin: 0;
          min-width: 320px;
          background: #080d18;
        }

        a { color: inherit; text-decoration: none; }

        button { font: inherit; }

        .site-shell {
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 80% 12%, #12305a55, transparent 38%),
            #080d18;
        }

        .container {
          width: min(1120px, calc(100% - 40px));
          margin: 0 auto;
        }

        .topbar {
          position: relative;
          z-index: 5;
          border-bottom: 1px solid #ffffff12;
          background: #080d18eF;
        }

        .nav {
          min-height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 19px;
          font-weight: 800;
          letter-spacing: .06em;
        }

        .brand-mark {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border: 1px solid #61d9ed88;
          border-radius: 11px;
          color: #69e5f4;
          background: #11253a;
          font-size: 15px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
          color: #b6c1d6;
          font-size: 13px;
        }

        .nav-links a:hover,
        .footer-links a:hover { color: #71e5f3; }

        .nav-cta, .primary-button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #62dcec;
          border-radius: 9px;
          background: #64d9eb;
          color: #07121d;
          font-weight: 750;
          transition: transform .2s ease, background .2s ease;
        }

        .nav-cta { padding: 11px 15px; }

        .primary-button { padding: 14px 20px; }

        .nav-cta:hover, .primary-button:hover {
          transform: translateY(-2px);
          background: #8cecf7;
        }

        .menu-toggle {
          display: none;
          border: 1px solid #ffffff2b;
          border-radius: 8px;
          padding: 9px 12px;
          color: #fff;
          background: #111c2c;
        }

        .hero { padding: 100px 0 88px; }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #71e5f3;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .eyebrow::before {
          content: "";
          width: 23px;
          height: 1px;
          background: #71e5f3;
        }

        h1 {
          max-width: 850px;
          margin: 23px 0;
          font-size: clamp(42px, 7.3vw, 78px);
          line-height: 1.04;
          letter-spacing: -.055em;
        }

        .accent {
          color: #72e4f3;
        }

        .hero-copy {
          max-width: 650px;
          color: #aab7ce;
          font-size: 17px;
          line-height: 1.85;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
          margin-top: 32px;
        }

        .secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 20px;
          border: 1px solid #ffffff2b;
          border-radius: 9px;
          color: #edf4ff;
          background: #ffffff05;
        }

        .secondary-button:hover {
          border-color: #71e5f3;
        }

        .hero-note {
          margin-top: 25px;
          color: #8190a8;
          font-size: 12px;
          line-height: 1.7;
        }

        .principles {
          border-top: 1px solid #ffffff13;
          border-bottom: 1px solid #ffffff13;
          background: #0d1422b8;
        }

        .principle-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        .principle {
          padding: 23px 24px;
          border-right: 1px solid #ffffff13;
        }

        .principle:first-child { padding-left: 0; }
        .principle:last-child { border-right: 0; }

        .principle strong {
          display: block;
          margin-bottom: 7px;
          font-size: 14px;
        }

        .principle span {
          color: #93a1b9;
          font-size: 12px;
          line-height: 1.6;
        }

        .section { padding: 88px 0; }

        .section-heading {
          max-width: 670px;
          margin-bottom: 35px;
        }

        h2 {
          margin: 15px 0;
          font-size: clamp(30px, 4vw, 44px);
          letter-spacing: -.035em;
        }

        .section-heading p {
          color: #aab7ce;
          line-height: 1.8;
        }

        .capability-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 17px;
        }

        .card {
          min-height: 230px;
          padding: 25px;
          border: 1px solid #ffffff16;
          border-radius: 15px;
          background: linear-gradient(145deg, #111d30, #0c1320);
        }

        .card-number {
          color: #70e1f0;
          font-size: 12px;
          letter-spacing: .12em;
        }

        .card h3 {
          margin: 25px 0 12px;
          font-size: 19px;
        }

        .card p {
          margin: 0;
          color: #a4b0c6;
          font-size: 13px;
          line-height: 1.8;
        }

        .governance {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 38px;
          align-items: start;
          padding: 34px;
          border: 1px solid #ffffff18;
          border-radius: 16px;
          background: #101a2a;
        }

        .governance h2 { margin-top: 0; }

        .governance p {
          color: #aab7ce;
          font-size: 14px;
          line-height: 1.85;
        }

        .governance-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .governance-list li {
          padding: 14px 0;
          border-bottom: 1px solid #ffffff14;
          color: #dce6f7;
          font-size: 13px;
        }

        .governance-list li::before {
          content: "✓";
          margin-right: 11px;
          color: #70e1f0;
        }

        .contact-panel {
          padding: 45px 25px;
          border: 1px solid #3b7184;
          border-radius: 16px;
          text-align: center;
          background: radial-gradient(ellipse at top, #17344a, #0d1523 72%);
        }

        .contact-panel h2 { margin-top: 0; }

        .contact-panel p {
          max-width: 590px;
          margin: 0 auto 25px;
          color: #b1bfd3;
          line-height: 1.8;
        }

        .footer {
          padding: 27px 0;
          border-top: 1px solid #ffffff14;
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 18px;
        }

        .footer small {
          color: #8795ad;
          line-height: 1.7;
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          color: #aab7ce;
          font-size: 12px;
        }

        @media (max-width: 760px) {
          .container { width: min(100% - 32px, 560px); }

          .nav { min-height: 68px; }

          .menu-toggle { display: inline-flex; }

          .nav-links {
            position: absolute;
            top: 68px;
            left: 0;
            right: 0;
            display: none;
            align-items: stretch;
            padding: 18px 20px 22px;
            border-bottom: 1px solid #ffffff1c;
            background: #0b1220;
          }

          .nav-links.open { display: flex; flex-direction: column; gap: 20px; }

          .nav-cta { text-align: center; }

          .hero { padding: 75px 0 65px; }

          .hero-copy { font-size: 15px; }

          .principle-row,
          .capability-grid,
          .governance { grid-template-columns: 1fr; }

          .principle,
          .principle:first-child {
            padding: 19px 0;
            border-right: 0;
            border-bottom: 1px solid #ffffff13;
          }

          .principle:last-child { border-bottom: 0; }

          .section { padding: 65px 0; }

          .card { min-height: auto; }

          .governance { padding: 24px; gap: 15px; }

          .footer-inner { align-items: flex-start; flex-direction: column; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after {
            transition-duration: .01ms !important;
            animation-duration: .01ms !important;
          }
        }
      `}</style>

      <header className="topbar">
        <div className="container nav">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="ECGSO home">
            <span className="brand-mark">E</span>
            <span>ECGSO</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
            <a href="#governance" onClick={closeMenu}>Governance</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <a className="nav-cta" href="#capabilities" onClick={closeMenu}>
              Explore the system
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container">
            <span className="eyebrow">ECGSO Global System</span>
            <h1>
              Build with purpose.
              <br />
              Govern with <span className="accent">control.</span>
            </h1>
            <p className="hero-copy">
              Building a foundation for secure, auditable, and owner-controlled
              digital infrastructure — designed to support sovereign AI,
              governed execution, and responsible technology development.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#capabilities">
                Explore capabilities <span aria-hidden="true">&nbsp;→</span>
              </a>
              <a className="secondary-button" href="#governance">
                Our principles
              </a>
            </div>
            <p className="hero-note">
              Security and operational capabilities must be verified through
              implementation and testing. This website does not claim that
              unverified features are already live.
            </p>
          </div>
        </section>

        <section className="principles" aria-label="Core principles">
          <div className="container principle-row">
            <div className="principle">
              <strong>Owner-controlled</strong>
              <span>Ownership and governance remain central to system design.</span>
            </div>
            <div className="principle">
              <strong>Security-first</strong>
              <span>Identity, permissions, and policy enforcement matter.</span>
            </div>
            <div className="principle">
              <strong>Evidence-driven</strong>
              <span>Operational claims should be supported by verifiable tests.</span>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container section-heading">
            <span className="eyebrow">Our direction</span>
            <h2>Infrastructure designed around sovereignty.</h2>
            <p>
              ECGSO Global System is being developed with a focus on control,
              accountability, and long-term ownership. The goal is to connect
              intelligent software with governed execution and transparent
              operational evidence.
            </p>
          </div>
        </section>

        <section className="section" id="capabilities">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">System capabilities</span>
              <h2>A foundation for the next generation.</h2>
              <p>
                These are architectural focus areas. Their production status
                depends on implementation, configuration, and verification.
              </p>
            </div>

            <div className="capability-grid">
              {capabilities.map((item) => (
                <article className="card" key={item.number}>
                  <span className="card-number">{item.number} / ECGSO</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="governance">
          <div className="container">
            <div className="governance">
              <div>
                <span className="eyebrow">Governance principles</span>
                <h2>Control the intelligence. Govern the execution.</h2>
                <p>
                  Trust should come from clear controls and evidence, not
                  slogans alone. ECGSO aims to make security boundaries,
                  ownership, and system behavior explicit as development
                  progresses.
                </p>
              </div>
              <ul className="governance-list">
                <li>Least-privilege access and identity checks</li>
                <li>Policy-governed execution paths</li>
                <li>Auditable decisions and operational evidence</li>
                <li>Privacy-aware data handling</li>
                <li>Verified deployment and health checks</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <div className="contact-panel">
              <span className="eyebrow">Connect with ECGSO</span>
              <h2>Build responsibly. Protect what matters.</h2>
              <p>
                For now, contact details can be added here once the official
                ECGSO contact address is configured and verified.
              </p>
              <a className="secondary-button" href="#home">
                Back to top ↑
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <small>
            © {new Date().getFullYear()} ECGSO Global System.
            <br />
            Ownership and rights reserved by their respective owner.
          </small>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#governance">Governance</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
