export type ArchiveEntry = {
  slug: string;
  name: string;
  category: 'AI & tooling' | 'Web products' | 'Data & ML' | 'Simulations';
  summary: string;
  detail: string;
  source: string | null;
  stack: string[];
};

export const archiveEntries: ArchiveEntry[] = [
  {
    "slug": "rule-zero",
    "name": "Rule Zero",
    "category": "AI & tooling",
    "summary": "A permission firewall that evaluates an AI agent’s proposed action before it can run.",
    "detail": "The controlled demo turns user intent into a typed contract. A deterministic policy can permit, block, or request one-time approval for a proposed action.",
    "source": "https://github.com/Enosh2212/rule-zero",
    "stack": [
      "TypeScript",
      "Policy checks",
      "Human approval"
    ]
  },
  {
    "slug": "notely",
    "name": "Notely",
    "category": "Web products",
    "summary": "A full-stack notes app with private workspaces, search, and explicit sharing permissions.",
    "detail": "The app supports database-backed sessions, Viewer and Editor sharing, protected note links and unsaved-change feedback.",
    "source": "https://github.com/Enosh2212/notely",
    "stack": [
      "Next.js",
      "PostgreSQL",
      "Better Auth"
    ]
  },
  {
    "slug": "flatsync",
    "name": "FlatSync 2.0",
    "category": "Web products",
    "summary": "An apartment management PWA for resident and administrator workflows.",
    "detail": "The app brings resident records, maintenance tracking, notices and complaints into separate resident and administrator views.",
    "source": null,
    "stack": [
      "Web app",
      "Operations",
      "Resident UX"
    ]
  },
  {
    "slug": "vibefix",
    "name": "VibeFix / CodeGum",
    "category": "AI & tooling",
    "summary": "A pre-launch diagnostic tool for AI-built web apps.",
    "detail": "A repository scanner and rule engine surface configuration, integration and deployment issues with evidence and suggested fixes.",
    "source": null,
    "stack": [
      "Python",
      "Repository analysis",
      "Diagnostics"
    ]
  },
  {
    "slug": "retailflow-ai",
    "name": "RetailFlow AI",
    "category": "Data & ML",
    "summary": "A SQL-backed forecast and replenishment exception assistant built with the M5 dataset.",
    "detail": "The pilot compares forecasts with a rolling baseline and routes low-confidence cases to planner review.",
    "source": "https://github.com/Enosh2212/retailflow-ai",
    "stack": [
      "SQL Server",
      "Python",
      "Forecasting"
    ]
  },
  {
    "slug": "quickcart-intelligence",
    "name": "QuickCart Intelligence",
    "category": "Data & ML",
    "summary": "An analytics project for revenue, delivery operations and customer behavior in quick commerce.",
    "detail": "It uses SQL and Python to prepare transaction-level data and analyze delivery SLAs, market performance, discounts and customer ratings.",
    "source": "https://github.com/Enosh2212/quickcart-intelligence",
    "stack": [
      "SQL",
      "Python",
      "Pandas"
    ]
  },
  {
    "slug": "coffee-shop-dashboard",
    "name": "Coffee Shop Revenue Intelligence",
    "category": "Data & ML",
    "summary": "A Streamlit dashboard for sales, products, store operations and customer demand.",
    "detail": "The dashboard turns transaction records into KPIs, trend views and filters for comparing product and store performance.",
    "source": "https://github.com/Enosh2212/coffee-shop-revenue-intelligence-dashboard",
    "stack": [
      "Python",
      "Streamlit",
      "Pandas"
    ]
  },
  {
    "slug": "risklens-ai",
    "name": "RiskLens AI",
    "category": "Data & ML",
    "summary": "An explainable credit-risk analysis dashboard using the UCI credit-card dataset.",
    "detail": "Model comparisons, customer-level drivers and a threshold simulator let users examine how classification decisions change.",
    "source": "https://github.com/Enosh2212/risklens-ai",
    "stack": [
      "Python",
      "scikit-learn",
      "Streamlit"
    ]
  },
  {
    "slug": "eeg-addiction-detection",
    "name": "EEG-Based Addiction Detection",
    "category": "Data & ML",
    "summary": "A machine-learning project for EEG analysis and prediction.",
    "detail": "The Streamlit application provides an interface for analyzing EEG data, visualizing results and running the project’s prediction workflow.",
    "source": "https://github.com/Enosh2212/eeg-based-addiction-detection-",
    "stack": [
      "Python",
      "Machine learning",
      "Streamlit"
    ]
  },
  {
    "slug": "sonar-adas",
    "name": "Sonar ADAS Digital Twin",
    "category": "Simulations",
    "summary": "A software simulation of ultrasonic obstacle detection and driver alerts.",
    "detail": "The digital twin models sensor readings, noise filtering, alert logic, and live telemetry in a dashboard.",
    "source": "https://github.com/Enosh2212/sonar-adas-digital-twin",
    "stack": [
      "JavaScript",
      "Signal filtering",
      "Simulation"
    ]
  },
  {
    "slug": "enosh-portfolio",
    "name": "Enosh Portfolio",
    "category": "Web products",
    "summary": "The earlier Next.js portfolio with responsive project pages and a command-line content workflow.",
    "detail": "The project includes responsive layouts, live project links and commands for adding and maintaining projects.",
    "source": "https://github.com/Enosh2212/enosh-portfolio",
    "stack": [
      "Next.js",
      "TypeScript",
      "CLI"
    ]
  }
];

