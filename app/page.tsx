"use client";

import { useEffect, useRef, useState } from "react";
import portfolioData from "@/content/portfolio.json";

type Project = {
  number: string;
  title: string;
  type: string;
  summary: string;
  outcome: string;
  stack: string[];
  live?: string;
  source?: string;
  caseStudy?: string;
  accent: string;
  featured?: boolean;
};

const projects = portfolioData.projects as Project[];
const additionalWork = portfolioData.additionalWork;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    rootRef.current?.style.setProperty("--mouse-x", `${event.clientX}px`);
    rootRef.current?.style.setProperty("--mouse-y", `${event.clientY}px`);
  };

  const copyEmail = async () => {
    const email = "enoshdavidsingh3@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const input = document.createElement("textarea");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main ref={rootRef} className="portfolio" onPointerMove={onPointerMove}>
      <div className="ambient-light" aria-hidden="true" />

      <nav className="nav wrap" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Enosh David Singh, home">
          <span>EDS</span>
          <i />
          <b>Portfolio · 2026</b>
        </a>
        <div className="nav-center">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </div>
        <a className="nav-contact" href="#contact">
          Let&apos;s talk <Arrow />
        </a>
      </nav>

      <section className="hero wrap" id="top">
        <div className="hero-copy">
          <div className="status enter enter-1">
            <i /> Data Analyst Intern · Open to 2026 opportunities
          </div>
          <h1 className="enter enter-2">
            I build software<br />
            <span>that makes sense.</span>
          </h1>
          <p className="hero-intro enter enter-3">
            Software engineer and data analyst working across full-stack products,
            analytics and applied AI. I turn messy problems into clear, useful systems.
          </p>
          <div className="hero-actions enter enter-4">
            <a className="primary-btn" href="#work">See selected work <Arrow /></a>
            <a className="text-link" href="https://github.com/Enosh2212" target="_blank" rel="noreferrer">
              GitHub <Arrow diagonal />
            </a>
            <a className="text-link" href="https://linkedin.com/in/enoshdavidsingh" target="_blank" rel="noreferrer">
              LinkedIn <Arrow diagonal />
            </a>
          </div>
        </div>

        <div className="hero-system enter enter-3" aria-label="A subtle map of Enosh's areas of work">
          <div className="system-header">
            <span>Working system</span>
            <span>Delhi NCR · IST</span>
          </div>
          <div className="system-stage" aria-hidden="true">
            <svg viewBox="0 0 620 430" role="img" aria-label="Connected nodes representing engineering, data and AI">
              <path className="network-path path-a" d="M82 282 C154 180 234 172 312 218 S469 270 548 128" />
              <path className="network-path path-b" d="M103 96 C193 116 225 206 312 218 S452 194 523 322" />
              <path className="network-path path-c" d="M82 282 C225 355 371 350 523 322" />
              <circle className="pulse-ring ring-1" cx="312" cy="218" r="46" />
              <circle className="pulse-ring ring-2" cx="312" cy="218" r="74" />
              <circle className="node node-main" cx="312" cy="218" r="13" />
              <circle className="node" cx="82" cy="282" r="7" />
              <circle className="node" cx="103" cy="96" r="7" />
              <circle className="node" cx="548" cy="128" r="7" />
              <circle className="node" cx="523" cy="322" r="7" />
              <circle className="traveller traveller-a" r="4" />
              <circle className="traveller traveller-b" r="4" />
            </svg>
            <span className="node-label label-a">Software</span>
            <span className="node-label label-b">Data</span>
            <span className="node-label label-c">Applied AI</span>
            <span className="node-label label-d">Product thinking</span>
            <div className="core-label"><b>Build</b><span>Measure</span><span>Improve</span></div>
          </div>
          <div className="system-footer">
            <span><b>7+</b> working systems</span>
            <span><b>3</b> live products</span>
            <span><b>2027</b> graduation</span>
          </div>
        </div>

        <div className="hero-foot enter enter-5">
          <span>01 — Full-stack products</span>
          <span>02 — Analytics systems</span>
          <span>03 — Responsible AI</span>
        </div>
      </section>

      <section className="work wrap" id="work">
        <header className="section-head" data-reveal>
          <div>
            <p className="kicker">01 / Selected work</p>
            <h2>Proof over polish.</h2>
          </div>
          <p>
            A curated set of products and systems. Each one shows the problem,
            the engineering choice and the result—not just a list of technologies.
          </p>
        </header>

        <div className="project-grid">
          {projects.map((project) => (
            <article
              className={`project-card ${project.featured ? "featured" : ""} accent-${project.accent}`}
              key={project.title}
              data-reveal
            >
              <div className="project-top">
                <span>{project.number}</span>
                <span>{project.type}</span>
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <strong>{project.outcome}</strong>
              </div>
              <div className="project-bottom">
                <div className="project-stack">
                  {project.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="project-actions">
                  {project.live && (
                    <a className="live-link" href={project.live} target="_blank" rel="noreferrer">
                      <i /> Live product <Arrow diagonal />
                    </a>
                  )}
                  {project.source && (
                    <a href={project.source} target="_blank" rel="noreferrer">
                      Source <Arrow diagonal />
                    </a>
                  )}
                  {project.caseStudy && (
                    <a href={project.caseStudy} target={project.caseStudy.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {project.title.includes("CodeGum") ? "Discuss project" : "Case study"} <Arrow diagonal />
                    </a>
                  )}
                </div>
              </div>
              <div className="project-signal" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            </article>
          ))}
        </div>

        <div className="more-work" data-reveal>
          <p className="kicker">More experiments</p>
          {additionalWork.map((item) => (
            <a href={item.href} target="_blank" rel="noreferrer" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <Arrow diagonal />
            </a>
          ))}
        </div>
      </section>

      <section className="experience wrap" id="experience">
        <header className="section-head" data-reveal>
          <div><p className="kicker">02 / Experience</p><h2>Work in context.</h2></div>
          <p>Hands-on experience with business data, product delivery and technical communication.</p>
        </header>

        <div className="timeline" data-reveal>
          <article>
            <time>Mar 2026 — Present</time>
            <div>
              <span>GVcloud Secure Pvt. Ltd. · Delhi NCR</span>
              <h3>Data Analyst Intern</h3>
              <p>Building analytics workflows, KPI reporting, forecasting experiments and decision-focused dashboards with SQL and Python.</p>
            </div>
            <b>Current</b>
          </article>
          <article>
            <time>Jun 2025 — Sep 2025</time>
            <div>
              <span>Virtual Marketing Era · Remote</span>
              <h3>Python Course Support & Content QA</h3>
              <p>Reviewed and improved 500+ pages of structured learning content for accuracy, consistency and learner clarity.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="about wrap" id="about">
        <div className="about-copy" data-reveal>
          <p className="kicker">03 / About</p>
          <h2>Curious enough to explore.<br /><span>Practical enough to ship.</span></h2>
          <p>
            I&apos;m pursuing a B.Tech in Computer Science Engineering with an AI/ML
            specialization at Sharda University, graduating in May 2027. My diploma
            in CSE gave me the foundations; building real products taught me how
            architecture, data, users and constraints meet in practice.
          </p>
        </div>
        <div className="capabilities" data-reveal>
          <div>
            <span>Engineering</span>
            <p>Next.js · React · TypeScript · Node.js · FastAPI · Socket.IO</p>
          </div>
          <div>
            <span>Data & ML</span>
            <p>Python · SQL · Power BI · Pandas · scikit-learn · Plotly</p>
          </div>
          <div>
            <span>Systems</span>
            <p>SQL Server · Azure SQL · MongoDB · SQLite · Streamlit · Git</p>
          </div>
          <div>
            <span>Education</span>
            <p>B.Tech CSE (AI/ML), 2027 · Diploma CSE, CGPA 8.0</p>
          </div>
        </div>
      </section>

      <section className="contact wrap" id="contact">
        <div className="contact-copy" data-reveal>
          <p className="kicker">04 / Contact</p>
          <h2>Let&apos;s make the next<br />useful thing.</h2>
          <p>Open to data, software engineering and applied AI opportunities.</p>
        </div>
        <div className="contact-actions" data-reveal>
          <a className="email" href="mailto:enoshdavidsingh3@gmail.com">
            enoshdavidsingh3@gmail.com <Arrow diagonal />
          </a>
          <div>
            <a href="https://github.com/Enosh2212" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
            <a href="https://linkedin.com/in/enoshdavidsingh" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
            <button className="copy-email" type="button" onClick={copyEmail}>
              {copied ? "Email copied ✓" : "Copy email"}
            </button>
          </div>
        </div>
      </section>

      <footer className="footer wrap">
        <div className="wordmark"><span>EDS</span><i /><b>Built with care, reviewed like a product.</b></div>
        <p>© 2026 Enosh David Singh</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
