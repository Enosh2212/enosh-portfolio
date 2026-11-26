import { BrandMascot } from './brand-mascot';
import { MotionLink } from './archive-motion';

export function SiteNav() {
  return <header className="site-header wrap">
    <MotionLink className="brand-home" href="/" aria-label="Enosh David Singh home"><BrandMascot size={44}/></MotionLink>
    <nav aria-label="Main navigation">
      <MotionLink href="/#work">Projects</MotionLink>
      <MotionLink href="/creative-work" className="creative-nav-link">Creative Work</MotionLink>
      <MotionLink href="/#experiments">Experiments</MotionLink>
      <MotionLink href="/#about">About</MotionLink>
      <MotionLink href="/#contact" className="contact-nav">Contact <span aria-hidden="true">↗</span></MotionLink>
    </nav>
  </header>;
}

