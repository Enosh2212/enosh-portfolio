export const creativeTools = [
  { name: 'Figma', use: 'UI design, wireframing and prototyping' },
  { name: 'Canva', use: 'Graphic design and marketing visuals' },
  { name: 'Adobe Premiere Pro', use: 'Video editing' },
  { name: 'DaVinci Resolve', use: 'Hands-on video editing' },
  { name: 'GSAP & CSS', use: 'Web animation and UI transitions' },
] as const;

export const creativeToolsSummary = [
  `Enosh's creative tools include ${creativeTools.map(({ name, use }) => `${name} for ${use[0].toLowerCase()}${use.slice(1)}`).join(', ')}.`,
  'His portfolio demonstrates scroll-triggered motion, staggered text reveals, page transitions and a looping poster gallery.',
].join(' ');
