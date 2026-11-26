import type { Metadata } from 'next';
import Image from 'next/image';
import { MotionLink } from './archive-motion';
import { notFound } from 'next/navigation';
import { ProjectArt } from './project-art';
import { SiteNav } from './site-nav';
import { projects } from '../content/work';



export function caseMetadata(slug: string): Metadata {

  const project = projects.find((item) => item.slug === slug);
  return project ? {title: project.name, description: project.summary} : {};
}
export function CaseStudy({slug}: {slug: string}) {

  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <><SiteNav/><main className="case-page wrap">
    <MotionLink className="back-link" href="/#work">← Back to projects</MotionLink>
    <article className="case-document paper">
      <header className="document-header"><div><span className="tag">{project.category}</span><h1>{project.name}</h1><p>{project.summary}</p><a className="button mustard" href={project.source}>{project.sourceLabel} ↗</a></div><ProjectArt kind={project.visual}/></header>
      <div className="document-body">
        <section><h2>The problem</h2><p>{project.problem}</p><h2>My contribution</h2><p>{project.role}</p></section>
        <section><h2>How it works</h2><ol className="decisions">{project.decisions.map(([title, detail]) => <li key={title}><strong>{title}</strong><p>{detail}</p></li>)}</ol></section>
      </div>
      {'image' in project && <figure className="case-screenshot"><Image src={project.image} alt={project.imageAlt} width={920} height={560} sizes="(max-width: 700px) 90vw, 850px"/><figcaption>Agreement explorer</figcaption></figure>}
      <section className="case-evidence"><h2>Implementation notes</h2><p>{project.evidence}</p><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></section>
    </article>
  </main></>;
}

