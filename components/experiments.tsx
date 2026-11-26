'use client';

import { MotionLink } from './archive-motion';
import { useState } from 'react';
import { experiments } from '../content/work';

export function Experiments() {
  const filters = ['All', 'AI agents', 'Dev tools', 'Product'];
  const [filter, setFilter] = useState('All');
  const visible = experiments.filter((item) => filter === 'All' || item.category === filter);
  return <section id="experiments" className="wrap experiments" data-unfold>
    <div className="section-line"><h2>Experiments</h2><div className="filters" aria-label="Filter experiments">
      {filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
    </div></div>
    <div className="experiment-list" aria-live="polite">
      {visible.map((item) => <MotionLink href={item.href} key={item.title}><span className="tag">{item.category}</span><strong>{item.title}</strong><span>{item.description}</span><span className="round-arrow" aria-hidden="true">↗</span></MotionLink>)}
    </div>
  </section>;
}

