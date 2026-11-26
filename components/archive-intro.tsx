'use client';

import { useEffect, useRef, useState } from 'react';
import { BrandMascot } from './brand-mascot';

type Stage = 'closed' | 'opening' | 'done';

const pageTurnClip = '/assets/book-page-turn.mp3';

function loadPageTurnClip() {
  return fetch(pageTurnClip)
    .then((response) => response.ok ? response.arrayBuffer() : null)
    .catch(() => null);
}

function playPageTurn(context: AudioContext, buffer: AudioBuffer, secondPage: boolean) {
  const offset = secondPage ? 1.74 : .86;
  const duration = .39;
  const start = context.currentTime + .025;
  const source = context.createBufferSource();
  const level = context.createGain();

  source.buffer = buffer;
  level.gain.setValueAtTime(0, start);
  level.gain.linearRampToValueAtTime(2, start + .025);
  level.gain.setValueAtTime(2, start + duration - .07);
  level.gain.linearRampToValueAtTime(0, start + duration);
  source.connect(level).connect(context.destination);
  source.onended = () => { source.disconnect(); level.disconnect(); };
  source.start(start, offset, duration);
}

export function ArchiveIntro() {
  const [stage, setStage] = useState<Stage>('done');
  const surface = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const clipBytes = useRef<Promise<ArrayBuffer | null> | null>(null);
  const decodedClip = useRef<Promise<AudioBuffer | null> | null>(null);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('enosh-archive-opened-v2') === '1'; } catch {}
    if (seen || window.location.hash) { delete document.documentElement.dataset.archivePending; return; }
    const frame = requestAnimationFrame(() => setStage('closed'));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const content = document.getElementById('portfolio-shell');
    if (stage === 'done') return;
    if (content) content.inert = true;
    document.body.classList.add('archive-locked');
    delete document.documentElement.dataset.archivePending;
    if (stage === 'closed') {
      clipBytes.current ??= loadPageTurnClip();
      trigger.current?.focus({preventScroll:true});
    }
    return () => { if (content) content.inert = false; document.body.classList.remove('archive-locked'); };
  }, [stage]);

  useEffect(() => {
    const replay = () => {
      window.scrollTo({top:0, behavior:'instant'});
      setStage('closed');
    };
    window.addEventListener('replay-archive', replay);
    return () => window.removeEventListener('replay-archive', replay);
  }, []);

  function finish() {
    try { sessionStorage.setItem('enosh-archive-opened-v2', '1'); } catch {}
    setStage('done');
    requestAnimationFrame(() => document.getElementById('home-title')?.focus({preventScroll:true}));
  }

  useEffect(() => {
    if (stage !== 'opening') return;
    const timer = window.setTimeout(() => {
      try { sessionStorage.setItem('enosh-archive-opened-v2', '1'); } catch {}
      setStage('done');
      requestAnimationFrame(() => document.getElementById('home-title')?.focus({preventScroll:true}));
    }, 2380);
    return () => {
      window.clearTimeout(timer);
      void audio.current?.close().catch(() => {});
      audio.current = null;
      decodedClip.current = null;
    };
  }, [stage]);

  function openBook() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }
    if (!audio.current) {
      try {
        const context = new AudioContext();
        audio.current = context;
        clipBytes.current ??= loadPageTurnClip();
        decodedClip.current = clipBytes.current
          .then((bytes) => bytes ? context.decodeAudioData(bytes.slice(0)) : null)
          .catch(() => null);
        void audio.current.resume().catch(() => {});
      } catch {}
    }
    setStage('opening');
  }

  function rustle(secondPage: boolean) {
    const context = audio.current;
    const cueTime = performance.now();
    void decodedClip.current?.then((buffer) => {
      if (buffer && context && audio.current === context && context.state === 'running' && performance.now() - cueTime < 140) {
        playPageTurn(context, buffer, secondPage);
      }
    });
  }

  if (stage === 'done') return null;
  return <div className="archive-gate" data-stage={stage} ref={surface} role="dialog" aria-modal="true" aria-label="The Unfolding Archive"
    onKeyDown={(event) => {
      if (event.key === 'Escape') finish();
      if (event.key === 'Tab') {
        const items = [...(surface.current?.querySelectorAll('button:not([disabled])') ?? [])] as HTMLButtonElement[];
        if (!items.length) return;
        if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1)?.focus(); }
        if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0]?.focus(); }
      }
    }}>
    <span className="archive-gate-brand" aria-hidden="true"><BrandMascot size={44}/></span>
    <button type="button" className="gate-skip" onClick={finish}>Skip intro <span aria-hidden="true">↗</span></button>
    <div className="gate-desk">
      <div className="desk-coffee" aria-hidden="true"><i/></div>
      <div className="desk-clip" aria-hidden="true"/>
      <aside className="desk-note" aria-hidden="true">Design<br/>Build<br/>Test<br/>Iterate</aside>
      <div className="desk-print desk-sketch" aria-hidden="true"/>
      <div className="book-space">
        <div className="book-shell" aria-hidden="true">
          <div className="book-back-board"/><div className="book-stack"/><div className="book-binding"/>
          <div className="book-inner"><span>Enosh<br/>David Singh</span><em>Project archive</em></div>
          <div className="book-leaf leaf-two" onAnimationStart={() => rustle(true)}><div className="leaf-front"><span>02</span><i>Design &amp; development</i></div><div className="leaf-back"><span>Project<br/>archive</span></div></div>
          <div className="book-leaf leaf-one" onAnimationStart={() => rustle(false)}><div className="leaf-front"><span>01</span><i>Enosh David Singh</i></div><div className="leaf-back"><span>The<br/>Archive</span></div></div>
          <div className="book-cover"><div className="book-cover-front"><span className="cover-mark">EDS</span><strong><small>The</small>Unfolding<br/>Archive</strong><em>Enosh David Singh</em></div><div className="book-cover-back"/></div>
        </div>
        {stage === 'closed' && <button className="book-hit" type="button" tabIndex={-1} aria-label="Open the archive book" onClick={openBook}/>}
      </div>
      <div className="gate-caption">
        <svg className="gate-arrow" viewBox="0 0 108 52" aria-hidden="true"><path d="M102 41C83 9 49 9 7 19m0 0 18-13M7 19l20 11"/></svg>
        <p className="gate-step"><span>{stage === 'closed' ? '01' : '02'}</span> {stage === 'closed' ? 'Arrive' : 'Unfold'}</p>
        {stage === 'closed' ? <button className="gate-open" ref={trigger} type="button" onClick={openBook}>Tap to open <span aria-hidden="true">↗</span></button> : <p className="gate-unfold" role="status">Opening the archive</p>}
      </div>
    </div>
  </div>;
}


export function ReplayArchive() {
  return <button type="button" className="replay-archive" onClick={() => window.dispatchEvent(new Event('replay-archive'))}>Replay opening <span aria-hidden="true">↻</span></button>;
}
