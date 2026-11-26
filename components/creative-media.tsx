'use client';

import { useEffect, useSyncExternalStore, type ReactNode } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

const getHash = () => window.location.hash;
const getServerHash = () => '';

export function CreativeMedia({ posterId, presentationId, videoId, posters, presentations, videos }: {
  posterId: string;
  presentationId: string;
  videoId?: string;
  posters: ReactNode;
  presentations: ReactNode;
  videos?: ReactNode;
}) {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const showingPresentations = hash === `#${presentationId}`;
  const showingVideos = Boolean(videoId && hash === `#${videoId}`);

  useEffect(() => {
    const targetId = getHash().replace(/^#/, '');
    if (targetId !== presentationId && targetId !== videoId) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [presentationId, videoId]);

  return <div className="studio-media">
    <nav className="studio-media-index" aria-label="Creative work categories">
      <a href={`#${posterId}`} aria-current={!showingPresentations && !showingVideos ? 'true' : undefined}>Posters &amp; campaigns</a>
      {videoId && <a href={`#${videoId}`} aria-current={showingVideos ? 'true' : undefined}>Video editing</a>}
      <a href={`#${presentationId}`} aria-current={showingPresentations ? 'true' : undefined}>Presentation design</a>
    </nav>
    <div className="studio-media-panel" id={posterId} hidden={showingPresentations || showingVideos}>{posters}</div>
    {videoId && videos && (
      <div className="studio-media-panel" id={videoId} hidden={!showingVideos}>
        {showingVideos && videos}
      </div>
    )}
    <div className="studio-media-panel" id={presentationId} hidden={!showingPresentations}>
      {showingPresentations && presentations}
    </div>
  </div>;
}
