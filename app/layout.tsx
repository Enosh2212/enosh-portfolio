import type { Metadata } from 'next';
import './globals.css';

import './motion.css';
import './about.css';
import './contact.css';
import './creative-work.css';
import './brand-fonts.css';
import './cursor.css';
import { ArchiveMotion } from '../components/archive-motion';

export const metadata: Metadata = {
  title: { default: 'Enosh David Singh | Product design & development', template: '%s | Enosh David Singh' },
  description: 'Product design, full-stack development and AI agent projects by Enosh David Singh.',
  icons: {
    icon: [
      { url: '/assets/enosh-favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/enosh-favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: { url: '/assets/enosh-apple-icon.png', sizes: '180x180', type: 'image/png' },
  },
  openGraph: { type: 'website', siteName: 'Enosh David Singh', title: 'The Unfolding Archive', description: 'Selected work by Enosh David Singh across product design, development and AI agents.' },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang="en" suppressHydrationWarning><head><link rel="preload" href="/assets/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><script dangerouslySetInnerHTML={{__html: "try{if(location.pathname==='/'&&!location.hash&&sessionStorage.getItem('enosh-archive-opened-v2')!=='1'){document.documentElement.dataset.archivePending='true';setTimeout(()=>delete document.documentElement.dataset.archivePending,3500);}}catch{}"}}/></head><body><ArchiveMotion>{children}</ArchiveMotion></body></html>;
}

