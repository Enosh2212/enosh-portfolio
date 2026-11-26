'use client';

import Image from 'next/image';
import { useState } from 'react';
import { projects } from '../content/work';
import { archiveEntries } from '../content/archive';
import { MotionLink } from './archive-motion';
import { ProjectArt } from './project-art';

const filters = ['All projects', 'AI & tooling', 'Web products', 'Data & ML', 'Simulations'] as const;
type Filter = typeof filters[number];

const artwork: Record<string, string> = {
  tideset: '/assets/tideset.webp',
  suqoonverse: '/assets/archive-suqoonverse.webp',
  'rule-zero': '/assets/archive-rule-zero.webp',
};

const motifs: Record<string, {mark: string; color: string}> = {
  notely: {mark:'✎', color:'lavender'},
  flatsync: {mark:'⌂', color:'olive'},
  vibefix: {mark:'</>', color:'ink'},
  'retailflow-ai': {mark:'↗', color:'olive'},
  'quickcart-intelligence': {mark:'▤', color:'gold'},
  'coffee-shop-dashboard': {mark:'☕︎', color:'umber'},
  'risklens-ai': {mark:'◔', color:'ink'},
  'eeg-addiction-detection': {mark:'∿', color:'lavender'},
  'sonar-adas': {mark:'◎', color:'olive'},
  'enosh-portfolio': {mark:'EDS', color:'umber'},
};

const cards = [
  ...projects.map((project) => ({
    ...project,
    group: project.slug === 'suqoonverse' ? 'Web products' : 'AI & tooling',
  })),
  ...archiveEntries.map((project) => ({...project, group: project.category, visual: null})),
].map((project, index) => ({...project, number:String(index+1).padStart(2,'0')}));

function ProjectPrint({slug, visual}: {slug: string; visual: string | null}) {
  const photo = artwork[slug];
  if (photo) {
    return <Image src={photo} alt="" fill sizes="(max-width: 480px) 35vw, (max-width: 850px) 31vw, 240px"/>;
  }
  if (visual) return <ProjectArt kind={visual}/>;
  const motif = motifs[slug];
  return <div className={'dossier-illustration tone-' + (motif?.color ?? 'gold')}>
    <div className="dossier-etching"><i/><i/><i/></div>
    <span>{motif?.mark ?? '✦'}</span>
  </div>;
}

export function ProjectArchive() {
  const [category, setCategory] = useState<Filter>('All projects');
  const [hasFiltered, setHasFiltered] = useState(false);
  const [search, setSearch] = useState('');
  const term = search.trim().toLowerCase();
  const visible = cards.filter((project) => {
    const terms = [project.name, project.summary, ...project.stack].join(' ').toLowerCase();
    return (category === 'All projects' || category === project.group) && terms.includes(term);
  });

  return <section id="work" className="project-archive wrap" aria-labelledby="work-title" data-unfold>
    <div className="archive-head"><div data-unfold data-text-reveal data-paper-heading><h2 id="work-title">Projects</h2><p>Products, AI agents, data projects and experiments.</p></div>
      <label className="archive-search"><span>Search projects</span><input type="search" value={search} onChange={(event)=>setSearch(event.target.value)} placeholder="Project name or keyword"/></label>
    </div>
    <div className="archive-controls"><div className="filters" aria-label="Filter projects">
      {filters.map((item)=><button type="button" key={item} aria-pressed={category===item} onClick={() => {
        if (item === category) return;
        setHasFiltered(true);
        setCategory(item);
      }}>{item}</button>)}
    </div><p role="status">{visible.length} {visible.length===1?'project':'projects'}</p></div>
    {visible.length > 0 ? <div className="dossier-grid" key={category} data-filtered={hasFiltered || undefined}>
      {visible.map((project) => <MotionLink href={'/work/' + project.slug} className="dossier-card" key={project.slug}>
        <div className="dossier-visual" aria-hidden="true">
          <span className="dossier-number">{project.number}</span>
          <div className="dossier-photo"><div className="dossier-image"><ProjectPrint slug={project.slug} visual={project.visual}/></div></div>
        </div>
        <div className="dossier-copy">
          <span className="dossier-category">{project.category}</span>
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          <ul className="dossier-stack" aria-label="Tools and technologies">
            {project.stack.slice(0,4).map((tool)=><li key={tool}>{tool}</li>)}
          </ul>
        </div>
        <span className="dossier-open" aria-hidden="true">↗</span>
      </MotionLink>)}
    </div> : <p className="archive-empty">No projects match. Try another keyword or filter.</p>}
  </section>;
}

