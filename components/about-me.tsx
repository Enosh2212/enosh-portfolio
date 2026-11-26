import Image from 'next/image';
import { creativeTools } from '../content/creative-tools';

const disciplines = [
  { name: 'Product design', icon: 'layers' },
  { name: 'Development', icon: 'code' },
  { name: 'AI & agents', icon: 'spark' },
] as const;

function DisciplineIcon({ icon }: { icon: typeof disciplines[number]['icon'] }) {
  return <svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {icon === 'layers' && <path d="m14 3 11 6-11 6L3 9l11-6Zm-11 11 11 6 11-6M3 19l11 6 11-6"/>}
    {icon === 'code' && <path d="m9 7-6 7 6 7m10-14 6 7-6 7M16 5l-4 18"/>}
    {icon === 'spark' && <path d="M17 3c0 5-2 7-7 7 5 0 7 2 7 7 0-5 2-7 7-7-5 0-7-2-7-7ZM8 13c0 4-2 6-6 6 4 0 6 2 6 6 0-4 2-6 6-6-4 0-6-2-6-6Z"/>}
  </svg>;
}

export function AboutMe() {
  return <section id="about" className="about-spread wrap" aria-labelledby="about-title">
    <div className="about-spread-copy">
      <p className="about-script">About me</p>
      <h2 id="about-title"><span className="about-title-line">I turn ideas </span><span className="about-title-line">into <em>products.</em></span></h2>
      <p className="about-bio">I’m Enosh, a final-year Computer Science student at Sharda University. I build full-stack products and AI agents, co-founded Suqoonverse with Riddhi Singhal, and wrote <cite>The Seat Beside Mine</cite>. During my internship at GVCloud Secure, I worked on web workflows and data dashboards.</p>
      <ul className="about-disciplines" aria-label="Areas of work">
        {disciplines.map(({name, icon}) => <li key={icon}><DisciplineIcon icon={icon}/><span>{name}</span></li>)}
      </ul>
      <div className="about-creative-tools">
        <h3>Creative tools</h3>
        <dl>
          {creativeTools.map(({ name, use }) => <div key={name}><dt>{name}</dt><dd>{use}</dd></div>)}
        </dl>
      </div>
      <a href="/Enosh_David_Singh_Resume.pdf" className="about-download button mustard" download>Download resume <span aria-hidden="true">↘</span></a>
    </div>
    <figure className="about-print" aria-hidden="true">
      <div className="about-binder"><i/></div>
      <Image
        className="about-print-image"
        src="/assets/about-design-notebook.webp"
        alt=""
        width={1000}
        height={998}
        sizes="(max-width: 580px) 215px, (max-width: 820px) 26vw, 30vw"
      />
      <figcaption>From my design notebook</figcaption>
    </figure>
  </section>;
}

