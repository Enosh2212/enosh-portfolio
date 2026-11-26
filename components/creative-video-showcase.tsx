'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { creativeVideos, type CreativeVideoProject } from '../content/creative-videos';

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function CreativeVideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<CreativeVideoProject | null>(null);
  const [hoverSlug, setHoverSlug] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const previewRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const playerShellRef = useRef<HTMLDivElement | null>(null);

  function pauseAllPreviews(exceptSlug?: string) {
    for (const [slug, el] of Object.entries(previewRefs.current)) {
      if (!el || slug === exceptSlug) continue;
      el.pause();
    }
  }

  function handlePreviewEnter(slug: string) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    pauseAllPreviews(slug);
    setHoverSlug(slug);
    const el = previewRefs.current[slug];
    if (el) {
      el.muted = true;
      void el.play().catch(() => {});
    }
  }

  function handlePreviewLeave(slug: string) {
    setHoverSlug((prev) => (prev === slug ? null : prev));
    const el = previewRefs.current[slug];
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  }

  function openCinemaViewer(project: CreativeVideoProject) {
    pauseAllPreviews();
    setHoverSlug(null);
    setCurrentTime(0);
    setDuration(0);
    setActiveVideo(project);
  }

  function closeCinemaViewer() {
    const vid = modalVideoRef.current;
    if (vid) {
      vid.pause();
    }
    setIsPlaying(false);
    dialogRef.current?.close();
    setActiveVideo(null);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeVideo && !dialog.open) {
      dialog.showModal();
      const vid = modalVideoRef.current;
      if (vid) {
        vid.volume = volume;
        vid.muted = isMuted;
        void vid
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [activeVideo, isMuted, volume]);

  function togglePlay() {
    const vid = modalVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      void vid.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }

  function toggleMute() {
    const vid = modalVideoRef.current;
    if (!vid) return;
    const nextMuted = !isMuted;
    vid.muted = nextMuted;
    setIsMuted(nextMuted);
  }

  function handleVolumeChange(nextVolume: number) {
    setVolume(nextVolume);
    const vid = modalVideoRef.current;
    if (vid) {
      vid.volume = nextVolume;
      if (nextVolume > 0 && isMuted) {
        vid.muted = false;
        setIsMuted(false);
      }
    }
  }

  function handleSeek(nextTime: number) {
    const vid = modalVideoRef.current;
    if (!vid) return;
    vid.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function toggleFullscreen() {
    const target = playerShellRef.current ?? modalVideoRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
    } else {
      void target.requestFullscreen?.().catch(() => {});
    }
  }

  function handleDialogKeyDown(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (e.key === ' ' || e.key.toLowerCase() === 'k') {
      if ((e.target as HTMLElement)?.tagName !== 'BUTTON') {
        e.preventDefault();
        togglePlay();
      }
    } else if (e.key.toLowerCase() === 'm') {
      e.preventDefault();
      toggleMute();
    } else if (e.key.toLowerCase() === 'f') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleSeek(Math.min(duration || 0, currentTime + 5));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleSeek(Math.max(0, currentTime - 5));
    }
  }

  return (
    <section className="studio-paper-stage studio-video-section" aria-labelledby="creative-videos-title">
      <header className="studio-video-head">
        <div>
          <p className="studio-kicker">Motion &amp; Reels</p>
          <h3 className="studio-medium-heading" id="creative-videos-title">
            Video Editing
          </h3>
        </div>
        <p className="studio-video-sub">
          Hover for a silent preview, or open any reel in the cinema viewer with full audio and
          playback controls.
        </p>
      </header>

      <div className="studio-video-grid">
        {creativeVideos.map((project) => {
          const isHovering = hoverSlug === project.slug;
          return (
            <article key={project.slug} className="studio-video-card">
              <div className="studio-video-mat" data-reel={project.slug}>
                <button
                  type="button"
                  className="studio-video-stage"
                  style={{ aspectRatio: `${project.width} / ${project.height}` }}
                  onClick={() => openCinemaViewer(project)}
                  onMouseEnter={() => handlePreviewEnter(project.slug)}
                  onMouseLeave={() => handlePreviewLeave(project.slug)}
                  onFocus={() => handlePreviewEnter(project.slug)}
                  onBlur={() => handlePreviewLeave(project.slug)}
                  aria-label={`Play ${project.title} (${project.duration}) in cinema viewer`}
                >
                  <Image
                    src={project.posterSrc}
                    width={project.width}
                    height={project.height}
                    alt={project.posterAlt}
                    sizes="(max-width: 700px) 86vw, 340px"
                    loading="lazy"
                    className="studio-video-poster"
                  />
                  <video
                    ref={(el) => {
                      previewRefs.current[project.slug] = el;
                    }}
                    src={project.videoSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className={`studio-video-preview ${isHovering ? 'is-active' : ''}`}
                  />
                  <span className="studio-video-duration">{project.duration}</span>
                  <span className="studio-video-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                    </svg>
                  </span>
                </button>
              </div>

              <div className="studio-video-meta">
                <p className="studio-video-cat">{project.category}</p>
                <h4>{project.title}</h4>
                <p className="studio-video-concept">{project.concept}</p>
                <p className="studio-video-story">{project.storytelling}</p>
                <ul className="studio-video-tags" aria-label="Editing techniques demonstrated">
                  {project.techniques.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        className="studio-dialog studio-video-dialog"
        aria-label={activeVideo ? `${activeVideo.title} video player` : 'Video player'}
        onCancel={(e) => {
          e.preventDefault();
          closeCinemaViewer();
        }}
        onKeyDown={handleDialogKeyDown}
      >
        {activeVideo && (
          <div className="studio-cinema-inner">
            <div className="studio-cinema-bar">
              <div>
                <span className="studio-cinema-cat">{activeVideo.category}</span>
                <h3>{activeVideo.title}</h3>
              </div>
              <button
                type="button"
                className="studio-cinema-close"
                onClick={closeCinemaViewer}
                aria-label="Close video player"
              >
                Close ✕
              </button>
            </div>

            <div className="studio-cinema-stage" ref={playerShellRef}>
              <div
                className="studio-cinema-frame"
                style={{ aspectRatio: `${activeVideo.width} / ${activeVideo.height}` }}
              >
                <video
                  ref={modalVideoRef}
                  src={activeVideo.videoSrc}
                  poster={activeVideo.posterSrc}
                  playsInline
                  preload="metadata"
                  onClick={togglePlay}
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>

              <div className="studio-cinema-controls" role="group" aria-label="Playback controls">
                <button
                  type="button"
                  className="studio-ctrl-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>

                <span className="studio-ctrl-time">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <input
                  type="range"
                  className="studio-ctrl-seek"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  aria-label="Seek video position"
                />

                <button
                  type="button"
                  className="studio-ctrl-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>

                <input
                  type="range"
                  className="studio-ctrl-vol"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  aria-label="Audio volume"
                />

                <button
                  type="button"
                  className="studio-ctrl-btn"
                  onClick={toggleFullscreen}
                  aria-label="Toggle fullscreen"
                >
                  Fullscreen
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
