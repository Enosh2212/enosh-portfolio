import type { Metadata } from 'next';
import { SiteNav } from '../../../components/site-nav';
import styles from './specimens.module.css';

export const metadata: Metadata = {
  title: 'Typography preview',
  robots: { index: false, follow: false },
};

const headings = ['Enosh David Singh', 'Selected Projects', 'Creative Work', 'I design what I build.', 'Let’s connect.'];

const pairings = [
  { name: 'Editorial', variant: 'editorial', note: 'Selected for the portfolio. The serif gives the name its own silhouette, and the sans keeps section titles and controls easy to scan.', fonts: 'Fraunces · Bricolage Grotesque · DM Sans' },
  { name: 'Graphic', variant: 'graphic', note: 'The heavier Creative Work title reads like a poster headline. Its closed letter spacing and rounded assistant title draw more attention at phone sizes.', fonts: 'Fraunces · Bricolage Grotesque · Gasoek One · DynaPuff · DM Sans' },
  { name: 'Rounded', variant: 'rounded', note: 'The soft display lettering makes the samples feel playful. The name and section headings have a similar visual weight, so the hierarchy is less clear.', fonts: 'Bagel Fat One · Lilita One · DynaPuff · DM Sans' },
] as const;

export default function TypographyPreview() {
  return <>
    <SiteNav />
    <main className={`wrap ${styles.page}`}>
      <h1>Typography preview</h1>
      {pairings.map(({ name, variant, fonts, note }) => (
        <section className={styles.pairing} key={variant} aria-label={name}>
          <h2>{name}</h2>
          <p>{fonts}</p>
          <p className={styles.note}>{note}</p>
          <div className={styles.samples}>
            {['Desktop', 'Mobile'].map((label) => <div className={styles.sample} key={label}>
              <p>{label}</p>
              <div className={`${styles.sampleBoard} ${styles[variant]} ${label === 'Mobile' ? styles.mobile : ''}`}>
                {headings.map((heading, index) => <div className={styles.line} key={heading} data-specimen={index}>{heading}</div>)}
                <p>Product design, development and AI</p>
              </div>
            </div>)}
          </div>
        </section>
      ))}
    </main>
  </>;
}
