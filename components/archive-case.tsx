import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { archiveEntries } from '../content/archive';
import { MotionLink } from './archive-motion';
import { SiteNav } from './site-nav';

export function archiveMetadata(slug: string): Metadata {
  const project = archiveEntries.find((item) => item.slug === slug);
  return project ? {title:project.name, description:project.summary} : {};
}

export function ArchiveCase({slug}: {slug:string}) {
  const project = archiveEntries.find((item) => item.slug === slug);
  if (!project) notFound();
  return <><SiteNav/><main className="case-page wrap">
    <MotionLink className="back-link" href="/#work">← Back to projects</MotionLink>
    <article className="case-document archive-document paper">
      <span className="tag">{project.category}</span><h1>{project.name}</h1><p className="archive-lead">{project.summary}</p>
      <section className="case-evidence"><h2>Project overview</h2><p>{project.detail}</p><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></section>
      {project.source ? <a className="button mustard" href={project.source}>View repository ↗</a> : <p className="private-source">Private source repository</p>}
    </article>
  </main></>;
}

