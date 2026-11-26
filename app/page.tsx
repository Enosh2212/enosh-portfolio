import { BrandMascot } from '../components/brand-mascot';
import { CreativeFeature } from '../components/creative-feature';
import { AboutMe } from '../components/about-me';
import { ProjectArchive } from '../components/project-archive';
import { HeroCharacter } from '../components/hero-character';
import { ArchiveIntro, ReplayArchive } from '../components/archive-intro';
import { Experiments } from '../components/experiments';
import { SiteNav } from '../components/site-nav';
import { BeyondProjects } from '../components/beyond-projects';
import { ConnectSection } from '../components/connect-section';

export default function Home() {
  return <>
    <ArchiveIntro/>
    <div id="portfolio-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <main id="main">
        <div className="hero-set">
          <SiteNav/>
          <section className="hero wrap" aria-labelledby="home-title">
            <div className="hero-main">
              <span className="hey paper">Hey, I’m</span>
              <h1 id="home-title" tabIndex={-1}><span>Enosh</span><span>David Singh</span></h1>
              <p>Product design <i>×</i> Development <i>×</i> AI</p>
              <p className="hero-roles"><a href="#writing">Novelist</a><span aria-hidden="true"> · </span><a href="#suqoonverse-milestone">Co-founder, Suqoonverse</a></p>
              <div className="hero-actions">
                <a className="button mustard" href="#work">Explore my work <span aria-hidden="true">↘</span></a>
                <a className="resume-link" href="/Enosh_David_Singh_Resume.pdf" download>View resume <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <HeroCharacter/>
          </section>
        </div>
        <ProjectArchive/>
        <CreativeFeature/>
        <BeyondProjects/>
        <Experiments/>
        <AboutMe/>
        <ConnectSection/>
      </main>
      <footer className="wrap site-footer"><span className="footer-brand"><BrandMascot size={26}/>Enosh David Singh</span><ReplayArchive/><a href="#">Back to top ↑</a></footer>
    </div>
  </>;
}

