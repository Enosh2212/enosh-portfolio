'use client';

import { useState } from 'react';
import { presentations } from '../content/presentations';

export function CreativePresentations({ titleLevel = 'h2' }: { titleLevel?: 'h2' | 'h3' }) {
  const [selected, setSelected] = useState(0);
  const deck = presentations[selected];
  const count = presentations.length;
  const Title = titleLevel;

  return <div className="studio-presentations">
    <div className="studio-deck-spread" id="creative-active-deck">
      <div className="studio-deck-story">
        <p className="studio-deck-category">{deck.category}</p>
        <Title aria-live="polite">{deck.title}</Title>
        <p className="studio-deck-note">{deck.designNote}</p>
        <a className="studio-deck-link" href={deck.viewUrl} target="_blank" rel="noopener noreferrer"
          aria-label={`Open full ${deck.title} deck in Canva (opens in a new tab)`}>View full deck <span aria-hidden="true">↗</span></a>
        <div className="studio-deck-pagination" role="group" aria-label="Browse presentations">
          <button type="button" aria-label="Previous presentation" onClick={() => setSelected((current) => (current + count - 1) % count)}>←</button>
          <span aria-live="polite" aria-label={`Presentation ${selected + 1} of ${count}`}>{selected + 1} / {count}</span>
          <button type="button" aria-label="Next presentation" onClick={() => setSelected((current) => (current + 1) % count)}>→</button>
        </div>
      </div>
      <div className="studio-deck-frame">
        <iframe key={deck.embedUrl} src={deck.embedUrl} title={`${deck.title} presentation preview`} loading="lazy" allowFullScreen />
      </div>
    </div>
    <div className="studio-deck-index" role="group" aria-label="Choose a presentation">
      {presentations.map((item, index) => <button type="button" key={item.viewUrl}
        aria-pressed={selected === index} aria-controls="creative-active-deck" onClick={() => setSelected(index)}>
        {item.title}
      </button>)}
    </div>
  </div>;
}
