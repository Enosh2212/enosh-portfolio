import { studioIntro } from '../content/creative-work';
import { MotionLink } from './archive-motion';
import { CreativePresentations } from './creative-presentations';
import { CreativeMedia } from './creative-media';
import { FeaturedCreativeGallery } from './creative-gallery';
import { CreativeVideoShowcase } from './creative-video-showcase';

export function CreativeFeature() {
  return <section className="wrap studio-feature" id="creative-work" aria-labelledby="creative-title">
    <header className="studio-heading" data-unfold data-text-reveal data-paper-heading>
      <div><p className="studio-kicker">Creative &amp; Marketing Studio</p><h2 id="creative-title">Creative Work</h2></div>
      <p>{studioIntro}</p>
    </header>
    <CreativeMedia posterId="featured-poster-stage" videoId="featured-video-stage" presentationId="featured-presentations-title"
      posters={<section className="studio-paper-stage studio-poster-stage" aria-labelledby="featured-posters-title">
        <header className="studio-poster-stage-header">
          <h3 className="studio-medium-heading" id="featured-posters-title">Posters &amp; Campaigns</h3>
          <MotionLink href="/creative-work#creative-posters-title">All creative work <span aria-hidden="true">↗</span></MotionLink>
        </header>
        <FeaturedCreativeGallery />
      </section>}
      videos={<CreativeVideoShowcase />}
      presentations={<CreativePresentations titleLevel="h3" />} />
  </section>;
}
