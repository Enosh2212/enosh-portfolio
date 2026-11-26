'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function HeroCharacter() {
  const layer = useRef<HTMLDivElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const [plays, setPlays] = useState(0);
  const limitReached = plays >= 2;

  useEffect(() => {
    const clip = audio.current;
    return () => clip?.pause();
  }, []);

  function playGreeting() {
    const clip = audio.current;
    if (limitReached || !clip?.paused) return;

    clip.currentTime = 0;
    void clip.play().then(() => setPlays(count => count + 1)).catch(() => {
      // A hover before the visitor's first click can be blocked by autoplay policy.
    });
  }

  useEffect(() => {
    const art = layer.current;
    const hero = art?.closest('.hero');
    if (!art || !hero || !matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) return;
    let frame = 0;
    let x = 0, y = 0;
    const render = () => {
      art.style.setProperty('--guide-x', x + 'px');
      art.style.setProperty('--guide-y', y + 'px');
      art.style.setProperty('--guide-turn', x * .14 + 'deg');
    };
    const move = (event: Event) => {
      const {clientX, clientY} = event as PointerEvent;
      const bounds = hero.getBoundingClientRect();
      x = ((clientX - bounds.left) / bounds.width - .5) * 30;
      y = ((clientY - bounds.top) / bounds.height - .5) * 22;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };
    const reset = () => { x = 0; y = 0; render(); };
    hero.addEventListener('pointermove',move);
    hero.addEventListener('pointerleave',reset);
    return () => { cancelAnimationFrame(frame); hero.removeEventListener('pointermove',move); hero.removeEventListener('pointerleave',reset); };
  }, []);
  return <figure className="hero-character">
    <div className="character-orbit" aria-hidden="true"><b/><i/><span>✦</span></div>
    <div className="character-layer" ref={layer}>
      <button
        type="button"
        className="character-greeting"
        aria-label="Play Enosh’s greeting"
        aria-disabled={limitReached}
        onClick={playGreeting}
        onPointerEnter={event => {
          if (event.pointerType === 'mouse') playGreeting();
        }}
      >
        <Image src="/assets/enosh-character.webp" alt="" width={550} height={825} sizes="(max-width:700px) 42vw, 32vw" preload/>
      </button>
    </div>
    <audio ref={audio} src="/assets/hero-greeting.mp3" preload="none"/>
  </figure>;
}

