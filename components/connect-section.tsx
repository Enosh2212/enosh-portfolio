export function ConnectSection() {
  return (
    <section id="contact" className="wrap connect-section" aria-labelledby="connect-heading" data-unfold>
      <div className="connect-spread paper">
        <div className="connect-left">
          <span className="connect-kicker">Contact</span>
          <div data-unfold data-text-reveal><h2 id="connect-heading">Let’s Connect.</h2></div>
          <p className="connect-lead">
            Open to exciting opportunities, meaningful collaborations and conversations about design,
            technology and AI.
          </p>
        </div>

        <div className="connect-details">
          <address className="connect-links">
            <a className="connect-link-row" href="mailto:enoshdavidsingh3@gmail.com">
              <span className="connect-link-meta">
                <span className="connect-link-label">Email</span>
                <span className="connect-link-value">enoshdavidsingh3@gmail.com</span>
              </span>
              <span className="connect-link-arrow" aria-hidden="true">↗</span>
            </a>

            <a
              className="connect-link-row"
              href="https://www.linkedin.com/in/enosh-singh-1062763b8"
              target="_blank"
              rel="noreferrer"
            >
              <span className="connect-link-meta">
                <span className="connect-link-label">LinkedIn</span>
                <span className="connect-link-value">linkedin.com/in/enosh-singh-1062763b8</span>
              </span>
              <span className="connect-link-arrow" aria-hidden="true">↗</span>
            </a>

            <a
              className="connect-link-row"
              href="https://github.com/Enosh2212"
              target="_blank"
              rel="noreferrer"
            >
              <span className="connect-link-meta">
                <span className="connect-link-label">GitHub</span>
                <span className="connect-link-value">github.com/Enosh2212</span>
              </span>
              <span className="connect-link-arrow" aria-hidden="true">↗</span>
            </a>
          </address>

          <a
            className="button mustard connect-resume-btn"
            href="/Enosh_David_Singh_Resume.pdf"
            download
          >
            Download resume <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
