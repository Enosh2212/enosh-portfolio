'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import { artworkSrc, type Artwork } from '../content/creative-work';

export function CreativeViewer({ artwork, title, slug }: { artwork: Artwork[]; title: string; slug: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const art = artwork[index];
  const multiple = artwork.length > 1;

  function go(delta: number) {
    if (!multiple) return;
    setIndex((current) => (current + delta + artwork.length) % artwork.length);
    setZoom(false);
  }

  function keyboard(event: KeyboardEvent<HTMLElement>) {
    if (!multiple || zoom) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      go(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  function touchStart(event: TouchEvent<HTMLElement>) {
    const point = event.touches[0];
    start.current = { x: point.clientX, y: point.clientY };
  }

  function touchEnd(event: TouchEvent<HTMLElement>) {
    const point = event.changedTouches[0];
    const origin = start.current;
    start.current = null;
    if (!origin || zoom || !point) return;
    const distance = point.clientX - origin.x;
    if (Math.abs(distance) > 45 && Math.abs(distance) > 1.3 * Math.abs(point.clientY - origin.y)) go(distance < 0 ? 1 : -1);
  }

  function show() {
    dialog.current?.showModal();
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
    setZoom(false);
    trigger.current?.focus({ preventScroll: true });
  }

  const controls = <>
    <button type="button" aria-label="Previous slide" onClick={() => go(-1)}>←</button>
    <span aria-live="polite">Slide {index + 1} / {artwork.length}</span>
    <button type="button" aria-label="Next slide" onClick={() => go(1)}>→</button>
  </>;

  return <div className="studio-viewer" onKeyDown={keyboard}>
    <figure>
      <button ref={trigger} className="studio-art-trigger" type="button" onClick={show} aria-label="View full-screen artwork"
        onTouchStart={touchStart} onTouchEnd={touchEnd} onTouchCancel={() => { start.current = null; }}>
        <span className="studio-poster-mat" data-poster={slug}>
          <Image src={artworkSrc(art)} width={art.width} height={art.height} alt={art.alt} sizes="(max-width: 700px) 92vw, 44vw" preload />
        </span>
      </button>
      <figcaption className="studio-art-caption">
        <button type="button" onClick={show}>View full-screen artwork ↗</button>
        {multiple && <div className="studio-slide-controls" aria-label="Artwork slides">{controls}</div>}
      </figcaption>
    </figure>
    <dialog ref={dialog} className="studio-dialog" aria-label={`${title} artwork`} onClose={onClose} onClick={(event) => {
      if (event.target === event.currentTarget) dialog.current?.close();
    }}>
      <div className="studio-dialog-inner">
        <div className="studio-view-toolbar">
          {multiple && <div className="studio-slide-controls" aria-label="Full-screen slides">{controls}</div>}
          <button type="button" aria-pressed={zoom} onClick={() => setZoom(!zoom)}>{zoom ? 'Fit to screen' : 'Zoom in'}</button>
          <button type="button" onClick={() => dialog.current?.close()} autoFocus>Close <span aria-hidden="true">×</span></button>
        </div>
        <div className={`studio-view-image${zoom ? ' is-zoomed' : ''}`} tabIndex={zoom ? 0 : undefined}
          aria-label={zoom ? 'Zoomed artwork. Scroll to pan.' : undefined}
          onTouchStart={touchStart} onTouchEnd={touchEnd} onTouchCancel={() => { start.current = null; }}>
          {open && <Image src={artworkSrc(art, 'png')} width={art.width} height={art.height} alt={art.alt} unoptimized />}
        </div>
      </div>
    </dialog>
  </div>;
}
