'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { artworkSrc, creativeHref, creativeProjects } from '../content/creative-work';
import { MotionLink } from './archive-motion';
import { CreativeVideoShowcase } from './creative-video-showcase';

const FILTER_OPTIONS = [
  'All Work',
  'Graphic Design',
  'Advertising & Marketing',
  'Video Editing',
] as const;

type FilterOption = (typeof FILTER_OPTIONS)[number];

function matchesPosterFilter(projectFilter: string, activeFilter: FilterOption): boolean {
  if (activeFilter === 'All Work') return true;
  if (activeFilter === 'Graphic Design') {
    return projectFilter === 'Book marketing' || projectFilter === 'Information design';
  }
  if (activeFilter === 'Advertising & Marketing') {
    return projectFilter === 'Advertising' || projectFilter === 'Social media';
  }
  return false;
}

const openingOrder = ['the-seat-beside-mine', 'some-feelings-sound-better', 'the-unspoken-things'];
const posterOrder = new Map(openingOrder.map((slug, index) => [slug, index]));
const loopProjects = [...creativeProjects].sort((a, b) =>
  (posterOrder.get(a.slug) ?? openingOrder.length) - (posterOrder.get(b.slug) ?? openingOrder.length),
);

function CreativePrint({ project, preload = false, featured = false, duplicate = false }: {
  project: typeof creativeProjects[number];
  preload?: boolean;
  featured?: boolean;
  duplicate?: boolean;
}) {
  const art = project.artwork[0];
  return <article>
    <MotionLink href={creativeHref(project.slug)} className="studio-print" tabIndex={duplicate ? -1 : undefined}>
      <span className="studio-poster-mat" data-poster={project.slug}>
      <Image src={artworkSrc(art)} width={art.width} height={art.height} alt={art.alt}
        sizes="(max-width: 520px) 90vw, (max-width: 840px) 45vw, 48vw"
        loading={featured ? 'eager' : undefined} preload={preload} />
      </span>
      <div className="studio-caption">
        <p>{project.category}</p>
        <h3>{project.title}</h3>
        {project.slug === 'some-feelings-sound-better' && <span>Unofficial Spotify concept</span>}
      </div>
    </MotionLink>
  </article>;
}

export function FeaturedCreativeGallery() {
  return <div className="studio-loop" style={{ '--poster-count': loopProjects.length } as CSSProperties}>
    <div className="studio-loop-track">
      <div className="studio-loop-group">
        {loopProjects.map((project) => <CreativePrint key={project.slug} project={project} featured />)}
      </div>
      <div className="studio-loop-group studio-loop-copy" aria-hidden="true">
        {loopProjects.map((project) => <CreativePrint key={project.slug} project={project} featured duplicate />)}
      </div>
    </div>
  </div>;
}

export function CreativeGallery() {
  const [filter, setFilter] = useState<FilterOption>('All Work');
  const list = useRef<HTMLDivElement>(null);
  const projects = creativeProjects.filter((project) => matchesPosterFilter(project.filter, filter));
  const showVideos = filter === 'All Work' || filter === 'Video Editing';

  useEffect(() => {
    const root = list.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let dispose: (() => void) | undefined;
    let cancelled = false;

    if (!preference.matches) void import('gsap').then(({ gsap }) => {
      if (cancelled || preference.matches) return;
      const context = gsap.context(() => {}, root);
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          context.add(() => gsap.fromTo(entry.target, { opacity: 0.65 }, {
            opacity: 1, duration: 0.72, ease: 'power3.out', clearProps: 'opacity',
          }));
        }
      }, { threshold: 0.12 });
      root.querySelectorAll('article').forEach((card) => observer.observe(card));
      dispose = () => { observer.disconnect(); context.revert(); };
    }).catch(() => {});
    const onPreference = () => { if (preference.matches) dispose?.(); };
    preference.addEventListener('change', onPreference);
    return () => {
      cancelled = true;
      dispose?.();
      preference.removeEventListener('change', onPreference);
    };
  }, [filter]);

  return <>
    <div className="studio-filters" role="group" aria-label="Filter creative work">
      {FILTER_OPTIONS.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
    </div>
    {projects.length > 0 && (
      <div className="studio-grid" ref={list}>
        {projects.map((project, index) => <CreativePrint key={project.slug} project={project}
          preload={index === 0 && filter === 'All Work'} />)}
      </div>
    )}
    {showVideos && <CreativeVideoShowcase />}
  </>;
}
