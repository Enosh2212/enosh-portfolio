export const projects = [
  {
    slug: 'tideset', name: 'Tideset', category: 'AI agent / Fintech', visual: 'tide',
    summary: 'An agreement planning agent that checks milestone payments against cash-flow constraints.',
    problem: 'A milestone schedule can look reasonable until the buyer runs short of cash or the provider takes on too much unpaid work.',
    role: 'I built the agreement planning workflow, deterministic validation and PayPal Sandbox integration.',
    decisions: [
      ['Generate a proposal', 'OpenRouter turns a brief and buyer and provider constraints into a structured milestone schedule. Zod validates the response shape.'],
      ['Validate the money', 'An integer-cent solver checks payment totals, liquidity and provider exposure, with a deterministic fallback for unavailable or invalid AI proposals.'],
      ['Explore a delay', 'A stress test shows the effect of delayed income and suggests a revised schedule for both parties to review.'],
    ],
    evidence: 'The checkout integration uses PayPal Sandbox, including server-side settlement verification.',
    stack: ['Next.js', 'TypeScript', 'OpenRouter', 'Prisma', 'PayPal Sandbox'],
    source: 'https://github.com/Enosh2212/tideset', sourceLabel: 'View source',
    image: '/assets/tideset.webp', imageAlt: 'Tideset agreement explorer showing milestone details',
  },
  {
    slug: 'faultline-zero', name: 'Faultline Zero', category: 'AI agent / Dev tools', visual: 'fault',
    summary: 'A pre-merge investigation agent that traces the impact of a pull request and surfaces evidence.',
    problem: 'A pull request can pass existing checks while leaving related behavior untested. Reviewers need to see which code and tests are affected.',
    role: 'I built the regression investigation workflow, FalkorDB integration and GitHub Check Run reporting.',
    decisions: [
      ['Map the change', 'An AST-based comparison identifies changed symbols. Commit-specific FalkorDB graphs connect those symbols to callers, tests and business rules.'],
      ['Investigate with tools', 'A bounded tool-calling loop selects regression checks and compares execution outcomes in the investigation environment. Evidence determines the verdict.'],
      ['Report the scope', 'The GitHub PR integration posts dependency and test evidence through Check Runs and marks runtime behavior as unverified when execution evidence is unavailable.'],
    ],
    evidence: 'The repository documents the GitHub App workflow and graph architecture.',
    stack: ['Python', 'FastAPI', 'FalkorDB', 'GitHub Apps', 'Docker'],
    source: 'https://github.com/Enosh2212/FAULTLINE-ZERO', sourceLabel: 'View source',
  },
  {
    slug: 'suqoonverse', name: 'Suqoonverse', category: 'Product / Real-time', visual: 'suqoon',
    summary: 'An anonymous peer-support platform with real-time matching and messaging.',
    problem: 'Getting to the first conversation can feel difficult when someone wants privacy and does not know who to talk to.',
    role: 'I co-founded Suqoonverse and worked across product and full-stack development, including matching and messaging.',
    decisions: [
      ['Make the first step clear', 'Anonymous matching and one-to-one chat give people a way to start a conversation without a public profile.'],
      ['Keep conversations connected', 'Socket.IO supports reconnect and rejoin behavior, typing indicators, and delivery and seen states.'],
      ['Give people control', 'Reporting and blocking are part of the messaging workflow. The broader product also includes voice rooms and guided Journeys.'],
    ],
    evidence: 'The public case study documents the product and its architecture. Suqoonverse was selected for the Sarvam Startup Program.',
    stack: ['Next.js', 'Node.js', 'Socket.IO', 'MongoDB', 'LiveKit'],
    source: 'https://github.com/Enosh2212/sukoon-case-study', sourceLabel: 'Public case study',
  },
] as const;
export const experiments = [
  { title: 'Cash-flow stress testing', category: 'AI agents', description: 'Simulate a delayed inflow and check what happens to a proposed payment schedule.', href: '/work/tideset' },
  { title: 'Regression investigation', category: 'Dev tools', description: 'Trace changed code, impacted callers and linked tests before a merge.', href: '/work/faultline-zero' },
  { title: 'Guided Journeys', category: 'Product', description: 'A reflection experience inside Suqoonverse.', href: '/work/suqoonverse' },
] as const;

