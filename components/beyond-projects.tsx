import Image from 'next/image';
import { MotionLink } from './archive-motion';

const bookstore = 'https://store.pothi.com/book/enosh-david-singh-the-seat-beside-mine/';
const kindle = 'https://www.amazon.it/Seat-Beside-Mine-English-ebook/dp/B0HS6DWRV8';
const sarvamProgram = 'https://www.sarvam.ai/startup-program';

export function BeyondProjects() {
  return <section className="beyond-projects wrap" aria-labelledby="beyond-title" data-unfold>
    <header className="beyond-heading" data-unfold data-text-reveal><h2 id="beyond-title">Writing &amp; startup</h2></header>
    <div className="beyond-grid">
      <article id="writing" className="writing-entry paper">
        <div className="book-jacket"><Image src="/assets/the-seat-beside-mine.webp" alt="Paperback cover of The Seat Beside Mine by Enosh David Singh" width={475} height={760} sizes="(max-width:700px) 28vw, 125px"/></div>
        <div><span className="tag">Author</span><h3>The Seat Beside Mine</h3><p>My debut novel follows Ken and Rehana from a school crush to an unexpected reunion six years later.</p><div className="entry-links">
          <a className="entry-link" href={bookstore}>Paperback on Pothi <span aria-hidden="true">↗</span></a>
          <a className="entry-link" href={kindle}>Ebook on Kindle <span aria-hidden="true">↗</span></a>
        </div></div>
      </article>
      <article id="suqoonverse-milestone" className="startup-entry">
        <div className="startup-heading"><span className="tag">Co-founder</span><h3>Suqoonverse</h3></div>
        <p>I co-founded Suqoonverse with Riddhi Singhal and helped build the platform’s real-time matching and messaging.</p>
        <p className="startup-selection"><span aria-hidden="true">✦</span> Selected for the Sarvam Startup Program</p>
        <div className="entry-links"><MotionLink className="entry-link" href="/work/suqoonverse">Case study <span aria-hidden="true">↗</span></MotionLink><a className="entry-link" href={sarvamProgram}>Sarvam AI <span aria-hidden="true">↗</span></a><a className="entry-link" href="https://www.linkedin.com/in/enosh-singh-1062763b8">My LinkedIn <span aria-hidden="true">↗</span></a></div>
      </article>
    </div>
  </section>;
}

