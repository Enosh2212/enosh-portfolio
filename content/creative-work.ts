export const studioIntro = 'A collection of posters, presentation decks and campaign concepts exploring how design communicates ideas and connects with people.';

export type Artwork = { file: string; width: number; height: number; alt: string };
type CreativeProject = {
  slug: string; title: string; category: string; filter: string; status: string;
  overview: string; objective: string; audience: string; concept: string;
  direction: string; strategy: string; artwork: Artwork[];
};

const poster = (file: string, alt: string): Artwork => ({ file, alt, width: 1122, height: 1402 });
export const artworkSrc = (art: Artwork, format: 'webp' | 'png' = 'webp') =>
  `/images/creative-work/${art.file}.${format}`;
export const creativeHref = (slug: string) => `/creative-work/${slug}`;

export const creativeProjects: CreativeProject[] = [
  {
    slug: 'the-seat-beside-mine', title: 'The Seat Beside Mine',
    category: 'Product Launch & Book Marketing', filter: 'Book marketing', status: 'Self-initiated book launch',
    overview: 'An editorial launch poster for my published romance novel, built around the nostalgia of sharing a seat in a classroom.',
    objective: 'Book awareness and reader discovery.',
    audience: 'Readers of contemporary romance, especially those drawn to school nostalgia and second-chance love stories.',
    concept: 'Two empty classroom chairs joined by a red thread suggest the relationship before the reader sees the book itself.',
    direction: 'Navy classroom sketches sit on cream paper. Red picks out the thread, part of the title and the release message.',
    strategy: 'Lead with a visual from the story, then give readers a clear path from the cover to the Pothi and Kindle availability line.',
    artwork: [poster('the-seat-beside-mine', 'Two illustrated classroom chairs joined by a red thread above the novel cover and Out Now announcement.')],
  },
  {
    slug: 'looking-for-a-forever-home', title: 'Looking for a Forever Home',
    category: 'Social Impact Advertising', filter: 'Advertising', status: 'Self-initiated concept',
    overview: 'A pet adoption campaign concept that uses a dog’s address tag to ask where its permanent home might be.',
    objective: 'Encourage responsible pet adoption and visits to local animal shelters.',
    audience: 'Prospective pet adopters who are ready to consider the long-term commitment of bringing an animal home.',
    concept: 'The tag answers the question in the headline with “With You,” putting the viewer into the story.',
    direction: 'Cream serif lettering and a warm dog portrait stand out against deep blue. Coral emphasizes the question and adoption call.',
    strategy: 'Use the direct gaze and address tag to draw attention, then end with a specific next step: visit a local shelter.',
    artwork: [poster('looking-for-a-forever-home', 'A dog on a blue background wears an address tag that reads “With You,” above a call to adopt.')],
  },
  {
    slug: 'some-feelings-sound-better', title: 'Some Feelings Sound Better',
    category: 'Brand Awareness', filter: 'Advertising', status: 'Unofficial Spotify concept · Self-initiated',
    overview: 'An unofficial Spotify campaign concept about the relationship between music and emotions.',
    objective: 'Build emotional association and brand recall.',
    audience: 'Listeners who use music to reflect, regulate or share their mood.',
    concept: 'A quiet listening moment pairs with the headline “Some feelings sound better” to suggest that music can express what words miss.',
    direction: 'Bold sans-serif type and a monochrome portrait sit against fine topographic lines. Green accents bring the eye back to the headphone cord and Spotify wordmark.',
    strategy: 'Use a recognizable listening moment and a short, repeatable line to connect the brand with a personal ritual.',
    artwork: [poster('some-feelings-sound-better-topographic', 'A monochrome portrait of a listener in headphones beneath black and green lettering, with topographic lines around the portrait.')],
  },
  {
    slug: 'the-attention-economy', title: 'The Attention Economy',
    category: 'Infographic & Information Design', filter: 'Information design', status: 'Self-initiated infographic',
    overview: 'A research-informed infographic on how digital platforms turn attention and engagement into advertising opportunities.',
    objective: 'Communicate a complex system using typography, visual metaphor and data.',
    audience: 'Social media users and students interested in how ad-funded platforms make money.',
    concept: 'A receipt unrolls from a phone to make the exchange between time spent and advertising revenue tangible.',
    direction: 'A blue grid and illustrated skyline frame the phone. Yellow guides readers to the headline and time spent, while red marks the revenue figure.',
    strategy: 'Use two prominent figures as entry points, then let the receipt and short explanatory copy connect them. Source credits remain on the original artwork.',
    artwork: [poster('the-attention-economy-blueprint', 'On a blue cityscape, a phone prints an attention receipt beside figures for daily social media time and Meta advertising revenue.')],
  },
  {
    slug: 'the-unspoken-things', title: 'Suqoonverse — The Unspoken Things',
    category: 'Social Media Campaign', filter: 'Social media', status: 'Suqoonverse campaign concept',
    overview: 'An emotional wellness campaign exploring why people sometimes hide their feelings behind “I’m fine.”',
    objective: 'Build awareness of Suqoonverse and encourage supportive conversations.',
    audience: 'People who find it difficult to talk about how they feel, and friends who want to check in with them.',
    concept: 'Layered portraiture and drawn marks give visual form to the tension between someone’s words and what they may be feeling.',
    direction: 'Bold cream type cuts through a dark halftone sky. Pale scribbles and red accents convey the tension between what we say and what we feel.',
    strategy: 'Start with a familiar phrase and turn it into an open question that makes space for reflection and conversation.',
    artwork: [poster('suqoonverse-the-unspoken-things-halftone', 'A layered portrait, white scribbles and a black-and-white halftone sky illustrate the question “Why do we say I’m fine when we’re not?”')],
  },
];
