import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MotionLink } from '../../../components/archive-motion';
import { CreativeViewer } from '../../../components/creative-viewer';
import { SiteNav } from '../../../components/site-nav';
import { creativeHref, creativeProjects } from '../../../content/creative-work';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return creativeProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = creativeProjects.find((item) => item.slug === slug);
  return { title: project?.title ?? 'Creative Work', description: project?.overview };
}

export default async function CreativeProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const index = creativeProjects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = creativeProjects[index];
  const previous = creativeProjects.at(index - 1)!;
  const next = creativeProjects[(index + 1) % creativeProjects.length];
  const details = [
    ['Campaign objective', project.objective],
    ['Intended audience', project.audience],
    ['Creative concept', project.concept],
    ['Typography & colour', project.direction],
    ['Marketing strategy', project.strategy],
  ];

  return <>
    <a className="skip-link" href="#creative-project">Skip to project</a>
    <SiteNav />
    <main id="creative-project" className="wrap studio-page studio-detail">
      <MotionLink className="studio-back" href="/creative-work">← Creative Work</MotionLink>
      <div className="studio-detail-grid">
        <header className="studio-detail-head">
          <p className="studio-kicker">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="studio-status">{project.status} · AI-assisted artwork</p>
          <p>{project.overview}</p>
        </header>
        <CreativeViewer artwork={project.artwork} title={project.title} slug={project.slug} />
        <dl className="studio-notes">
          {details.map(([label, copy]) => <div key={label}><dt>{label}</dt><dd>{copy}</dd></div>)}
        </dl>
      </div>
      <nav className="studio-neighbours" aria-label="Explore more creative projects">
        <MotionLink href={creativeHref(previous.slug)}><span>← Previous project</span>{previous.title}</MotionLink>
        <MotionLink href={creativeHref(next.slug)}><span>Next project →</span>{next.title}</MotionLink>
      </nav>
    </main>
  </>;
}
