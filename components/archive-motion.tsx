'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react';

const Navigate = createContext<((href: string) => boolean) | null>(null);
const seam = '0,73 5,71 9,68 13,69 16,65 20,65 24,60 27,61 30,57 34,58 37,54 42,52 45,53 49,48 52,49 56,44 60,43 63,45 68,38 71,40 75,36 78,35 82,31 86,32 89,27 93,26 96,23 100,21';
const points = seam.split(' ').map((pair) => pair.split(',').map((value) => value + '%').join(' ')).join(',');

function PaperTear({ phase }: { phase: 'cover' | 'reveal' }) {
  return <div className={'route-tear tear-' + phase} aria-hidden="true">
    <div className="tear-pack">
      <div className="tear-half tear-upper" style={{clipPath: `polygon(0 0,100% 0,${points.split(',').reverse().join(',')})`}}/>
      <div className="tear-half tear-lower" style={{clipPath: `polygon(${points},100% 100%,0 100%)`}}/>
      {phase === 'reveal' && <>
        <svg className="tear-fibres tear-fibres-upper" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points={seam}/></svg>
        <svg className="tear-fibres tear-fibres-lower" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points={seam}/></svg>
      </>}
    </div>
  </div>;
}

export function ArchiveMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const prior = useRef(pathname);
  const pending = useRef(false);
  const timer = useRef(0);
  const failsafe = useRef(0);
  const audio = useRef<AudioContext | null>(null);
  const buffer = useRef<Promise<AudioBuffer | null> | null>(null);
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle');

  function prepareSound() {
    try {
      const context = audio.current ?? new AudioContext();
      audio.current = context;
      void context.resume().catch(() => {});
      buffer.current ??= fetch('/assets/paper-rip.wav')
        .then((response) => response.ok ? response.arrayBuffer() : null)
        .then((bytes) => bytes ? context.decodeAudioData(bytes) : null)
        .catch(() => null);
    } catch {}
  }

  function navigate(href: string) {
    const target = new URL(href, window.location.href);
    if (target.origin !== location.origin || target.pathname === pathname || matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (pending.current) return true;
    pending.current = true;
    // Play only on deliberate navigation, and on the project opening rather than the return link.
    if (target.pathname.startsWith('/work/')) prepareSound();
    setPhase('cover');
    timer.current = window.setTimeout(() => router.push(href), 260);
    failsafe.current = window.setTimeout(() => { pending.current = false; setPhase('idle'); }, 4500);
    return true;
  }

  useEffect(() => {
    if (prior.current === pathname) return;
    prior.current = pathname;
    const wasClicked = pending.current;
    window.clearTimeout(failsafe.current);
    window.clearTimeout(timer.current);
    let active = true;
    let source: AudioBufferSourceNode | null = null;
    const frame = requestAnimationFrame(() => {
      if (!wasClicked || matchMedia('(prefers-reduced-motion: reduce)').matches) {
        pending.current = false;
        setPhase('idle');
        return;
      }
      setPhase('reveal');
      if (!pathname.startsWith('/work/')) return;
      const began = performance.now();
      void buffer.current?.then((sample) => {
        const context = audio.current;
        if (!active || !sample || !context || context.state !== 'running' || performance.now() - began > 140) return;
        source = context.createBufferSource();
        source.buffer = sample;
        source.connect(context.destination);
        source.start(context.currentTime + .09);
      });
    });

    return () => {
      active = false;
      if (source) { try { source.stop(); } catch {} source.disconnect(); }
      cancelAnimationFrame(frame);

    };
  }, [pathname]);

  useEffect(() => {
    if (phase !== 'reveal') return;
    const done = window.setTimeout(() => { pending.current = false; setPhase('idle'); }, 840);
    return () => window.clearTimeout(done);
  }, [phase]);

  useEffect(() => () => {
    window.clearTimeout(timer.current);
    window.clearTimeout(failsafe.current);
    void audio.current?.close().catch(() => {});
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        target.setAttribute('data-on-screen', 'true');
        observer.unobserve(target);
      }
    }, { threshold: .13 });
    for (const item of document.querySelectorAll('[data-unfold]')) {
      item.setAttribute('data-motion-ready', 'true');
      observer.observe(item);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return <Navigate.Provider value={navigate}>
    {children}
    {phase !== 'idle' && <PaperTear phase={phase}/>}
  </Navigate.Provider>;
}

export function MotionLink({ href, onNavigate, ...rest }: ComponentProps<typeof Link>) {
  const navigate = useContext(Navigate);
  return <Link {...rest} href={href} onNavigate={(event) => {
    onNavigate?.(event);
    if (typeof href === 'string' && navigate?.(href)) event.preventDefault();
  }}/>;
}

