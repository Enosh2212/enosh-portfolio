export type CreativeVideoProject = {
  slug: string;
  title: string;
  category: string;
  filter: 'Video Editing';
  duration: string;
  width: number;
  height: number;
  videoSrc: string;
  posterSrc: string;
  posterAlt: string;
  concept: string;
  techniques: readonly string[];
  storytelling: string;
};

export const creativeVideos: CreativeVideoProject[] = [
  {
    slug: 'the-exit-student-ai-workshop',
    title: 'THE EXIT — Student AI Workshop',
    category: 'Motion Graphics & Event Promo',
    filter: 'Video Editing',
    duration: '0:28',
    width: 1080,
    height: 1920,
    videoSrc: '/videos/creative-work/the-exit-student-ai-workshop.mp4',
    posterSrc: '/images/creative-work/the-exit-student-ai-workshop.webp',
    posterAlt: 'Title frame from THE EXIT Student AI Workshop promo reel showing bold purple typography and a monochrome student cutout.',
    concept:
      'A 28-second vertical promo reel challenging students to move beyond basic copy-paste AI prompts toward generative, agentic, and physical AI.',
    techniques: [
      'Kinetic typography',
      'Layered UI card transitions',
      'Monochrome cutout compositing',
      'Voiceover-to-beat pacing',
    ],
    storytelling:
      'Opens with a relatable student-at-laptop hook, builds momentum through sliding workflow cards and a 3D robotic arm reveal, and closes on a direct invitation to take part.',
  },
  {
    slug: 'a-day-of-korea-delhi-2026',
    title: 'A Day of Korea — Korea Culture Day 2026',
    category: 'Event Recap & Short-Form Reel',
    filter: 'Video Editing',
    duration: '0:25',
    width: 720,
    height: 1280,
    videoSrc: '/videos/creative-work/a-day-of-korea-delhi-2026.mp4',
    posterSrc: '/images/creative-work/a-day-of-korea-delhi-2026.webp',
    posterAlt: 'Opening frame from A Day of Korea reel showing the illuminated Korea Culture Day 2026 entrance in Delhi with red editorial typography.',
    concept:
      'A fast-paced cultural festival recap capturing the street food, crowd energy, and live stage performances of Korea Culture Day 2026 in Delhi.',
    techniques: [
      'Beat-synced rhythmic cuts',
      '3-column vertical split-screens',
      'Stacked 2-up performance framing',
      'Editorial title overlays',
    ],
    storytelling:
      'Uses a stacked photo-deck intro and bold red title card to pull viewers through the festival gates, pairing split-screen crowd energy with music, Taekwondo, and classical stage moments.',
  },
];
