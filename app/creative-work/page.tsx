import type { Metadata } from 'next';
import { CreativePresentations } from '../../components/creative-presentations';
import { CreativeGallery } from '../../components/creative-gallery';
import { CreativeMedia } from '../../components/creative-media';
import { SiteNav } from '../../components/site-nav';
import { studioIntro } from '../../content/creative-work';

export const metadata: Metadata = { title: 'Creative & Marketing Studio', description: studioIntro };

export default function CreativeWorkPage() {
  return <>
    <a className="skip-link" href="#creative-gallery">Skip to creative work</a>
    <SiteNav />
    <main className="wrap studio-page" id="creative-gallery">
      <header className="studio-heading" data-unfold data-text-reveal>
        <div><p className="studio-kicker">Creative &amp; Marketing Studio</p><h1>Creative Work</h1></div>
        <p>{studioIntro}</p>
      </header>
      <CreativeMedia posterId="creative-posters-title" presentationId="creative-presentations-title"
        posters={<CreativeGallery />}
        presentations={<CreativePresentations />} />
    </main>
  </>;
}
