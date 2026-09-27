import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Download, Menu, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import landscape from '@/assets/western-hero.jpg';
import rider from '@/assets/western-rider.png';
import duel from '@/assets/western-duel.jpg';
import scout from '@/assets/western-scout.jpg';
import lawman from '@/assets/western-lawman.jpg';
import revolver from '@/assets/western-revolver.jpg';
import rifle from '@/assets/western-rifle.jpg';
import knife from '@/assets/western-knife.jpg';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Dust & Reckoning — An Original Western World' },
      { name: 'description', content: 'Ride into Dust & Reckoning, an original cinematic western world of outlaws, old debts, and the last open frontier.' },
      { property: 'og:title', content: 'Dust & Reckoning — An Original Western World' },
      { property: 'og:description', content: 'An original cinematic western world of outlaws, old debts, and the last open frontier.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Index,
});

const nav = [
  { label: 'The Story', href: '#story' },
  { label: 'The People', href: '#people' },
  { label: 'The Arsenal', href: '#arsenal' },
  { label: 'Gallery', href: '#gallery' },
];

const people = [
  { name: 'Silas Vale', role: 'The outlaw', detail: 'A man running from the only name he ever knew.', image: rider, imageClass: 'person-rider', grit: 'Unbroken', allegiance: 'None' },
  { name: 'Mara Quinn', role: 'The scout', detail: 'She knows every trail. None of them lead home.', image: scout, imageClass: '', grit: 'Unshaken', allegiance: 'The frontier' },
  { name: 'Elias Crowe', role: 'The lawman', detail: 'Justice has a price. He intends to collect.', image: lawman, imageClass: '', grit: 'Relentless', allegiance: 'The badge' },
];

const weapons = [
  { name: 'The Widowmaker', type: '01 / Six-shot revolver', description: 'An old companion with a long memory. Six chances to change the course of a bad day.', detail: 'Close range', finish: 'Engraved steel', image: revolver },
  { name: 'The Long Road', type: '02 / Lever-action rifle', description: 'Built for open country and the kind of distance a man cannot cross on foot.', detail: 'Long range', finish: 'Walnut & steel', image: rifle },
  { name: 'The Last Word', type: '03 / Hunting knife', description: 'When the dust settles and the bullets are gone, there is always one more choice.', detail: 'Close quarters', finish: 'Bone & leather', image: knife },
];

const notes = [
  { number: '01', category: 'THE TERRITORY', title: 'A land that keeps its secrets', text: 'Beyond the last rail line, the desert remembers what the towns tried to forget.', image: landscape },
  { number: '02', category: 'THE CROSSROADS', title: 'No one rides alone forever', text: 'Every stranger has a story. Every favor comes due before the sun goes down.', image: duel },
  { number: '03', category: 'THE CHOICE', title: 'What remains of a good man', text: 'Out here, the difference between justice and revenge is a matter of perspective.', image: scout },
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [weaponIndex, setWeaponIndex] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [filmOpen, setFilmOpen] = useState(false);
  const weapon = weapons[weaponIndex] ?? weapons[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightbox || filmOpen ? 'hidden' : '';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setLightbox(null); setFilmOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [menuOpen, lightbox, filmOpen]);

  return (
    <>
      <header className={`site-nav ${scrolled || menuOpen ? 'scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="Dust and Reckoning home"><span className="brand-monogram">D<span>&</span>R</span><span className="brand-name">DUST &<br />RECKONING</span></a>
        <nav className="nav-links" aria-label="Main navigation">{nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <span className="nav-edition">AN ORIGINAL WESTERN WORLD</span>
        <Button variant="iconBare" size="icon" className="menu-trigger icon-control" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>
      {menuOpen && <div className="menu-panel" role="dialog" aria-modal="true" aria-label="Navigation menu">{[{ label: 'Home', href: '#top' }, ...nav, { label: 'Field Notes', href: '#notes' }].map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</div>}

      <main>
        <section className="hero" id="top" aria-label="Dust and Reckoning introduction">
          <img className="hero-bg" src={landscape} alt="" width={1920} height={1080} fetchPriority="high" />
          <div className="hero-shade" />
          <div className="hero-sunwash" />
          <img className="hero-character" src={rider} alt="An outlaw rides a dark horse into the frontier" width={1024} height={1536} fetchPriority="high" />
          <div className="hero-grain" />
          <div className="hero-content">
            <div className="hero-overline"><span className="overline-rule" /> THE END OF THE OPEN FRONTIER <span className="overline-rule" /></div>
            <h1 className="hero-title">DUST <span>&</span><br />RECKONING</h1>
            <p className="hero-lead">Some debts don’t stay buried.</p>
            <p className="hero-description">A story of old loyalties, new enemies, and the land between who you were and who you become.</p>
            <div className="hero-actions"><a className="primary-action" href="#story">EXPLORE THE STORY <ArrowRight aria-hidden="true" /></a><Button variant="iconBare" className="film-link" onClick={() => setFilmOpen(true)}><Play aria-hidden="true" /> FILM COMING SOON</Button></div>
          </div>
          <div className="hero-bottom"><span>EST. AT THE EDGE OF THE WORLD <span className="bottom-divider">/</span> CHAPTER I</span><a href="#story">SCROLL TO EXPLORE <ArrowDown aria-hidden="true" /></a></div>
        </section>

        <section className="story-section" id="story">
          <img className="story-image" src={duel} alt="Two gunslingers face each other in a dusty frontier town" loading="lazy" width={1536} height={1024} />
          <div className="story-shade" />
          <div className="section-inner story-inner"><div className="story-copy reveal"><span className="eyebrow">CHAPTER I / THE STORY</span><h2 className="section-heading">THE WEST<br />FORGETS<br /><em>NO ONE.</em></h2><p className="section-lead">The railroad is coming. The old world is dying. And Silas Vale has one last chance to outrun the life he left behind.</p><p>Across a lawless frontier, every road leads to a choice. Some make legends. Others make ghosts.</p><a className="text-link" href="#people">MEET THE PEOPLE <ArrowRight aria-hidden="true" /></a></div></div>
          <span className="section-stamp">01 / THE STORY</span>
        </section>

        <section className="people-section section" id="people"><div className="section-inner"><div className="section-topline reveal"><div><span className="eyebrow">FACES OF THE FRONTIER</span><h2 className="section-heading">NO SAINTS.<br /><em>NO SAVIORS.</em></h2></div><span className="section-index">02 — 04 / THE PEOPLE</span></div><div className="people-grid">{people.map((person, index) => <article className="person-card reveal" key={person.name}><div className="person-image"><img className={person.imageClass} src={person.image} alt={person.name} loading="lazy" width={1024} height={index === 0 ? 1536 : 1280} /></div><div className="person-info"><span className="person-number">0{index + 1} / {person.role}</span><h3>{person.name}</h3><p>{person.detail}</p><div className="person-meta"><span>SPIRIT <b>{person.grit}</b></span><span>LOYALTY <b>{person.allegiance}</b></span></div></div></article>)}</div></div></section>

        <section className="arsenal-section section" id="arsenal"><div className="section-inner"><div className="section-topline reveal"><div><span className="eyebrow">TOOLS OF SURVIVAL</span><h2 className="section-heading">THE ARSENAL.</h2></div><span className="section-index">03 — 04 / THE ARSENAL</span></div><div className="weapon-view reveal"><div className="weapon-visual"><img key={weapon.name} src={weapon.image} alt={weapon.name} loading="lazy" width={1536} height={1024} /></div><div className="weapon-detail"><span className="eyebrow">{weapon.type}</span><h3>{weapon.name}</h3><p>{weapon.description}</p><div className="weapon-stats"><div><span>BEST FOR</span><b>{weapon.detail}</b></div><div><span>FINISH</span><b>{weapon.finish}</b></div></div><div className="weapon-controls"><Button variant="square" size="icon" className="square-control" aria-label="Previous weapon" onClick={() => setWeaponIndex((weaponIndex + weapons.length - 1) % weapons.length)}><ArrowLeft /></Button><span>0{weaponIndex + 1} / 0{weapons.length}</span><Button variant="square" size="icon" className="square-control" aria-label="Next weapon" onClick={() => setWeaponIndex((weaponIndex + 1) % weapons.length)}><ArrowRight /></Button></div></div></div></div></section>

        <section className="notes-section section" id="notes"><div className="section-inner"><div className="section-topline reveal"><div><span className="eyebrow">FROM THE TERRITORY</span><h2 className="section-heading">FIELD NOTES.</h2></div><span className="section-index">STORIES FROM THE ROAD</span></div><div className="notes-grid">{notes.map((note) => <article className="note reveal" key={note.number}><img src={note.image} alt="" loading="lazy" width={1536} height={1024} /><div className="note-copy"><span>{note.number} / {note.category}</span><h3>{note.title}</h3><p>{note.text}</p></div></article>)}</div></div></section>

        <section className="gallery-section section" id="gallery"><div className="section-inner"><div className="section-topline reveal"><div><span className="eyebrow">GLIMPSES OF THE FRONTIER</span><h2 className="section-heading">THE WORLD, <em>UNBROKEN.</em></h2></div><span className="section-index">SELECTED FRAMES</span></div><div className="gallery-grid reveal">{[{ src: landscape, alt: 'Sunset over the frontier desert' }, { src: duel, alt: 'Duel on a dusty frontier street' }, { src: scout, alt: 'Mara Quinn surveying the frontier' }, { src: revolver, alt: 'Engraved frontier revolver' }].map((item) => <Button variant="image" key={item.alt} className="gallery-tile" aria-label={`Enlarge ${item.alt}`} onClick={() => setLightbox(item)}><img src={item.src} alt={item.alt} loading="lazy" width={1536} height={1024} /></Button>)}</div></div></section>

        <section className="closing-section"><img src={landscape} alt="" loading="lazy" width={1920} height={1080} /><div className="closing-shade" /><div className="closing-content reveal"><span className="eyebrow">THE ROAD GOES ON</span><h2>THE SUN SETS<br />ON EVERYONE.</h2><p>Take a piece of the frontier with you.</p><Button asChild variant="default" className="primary-action"><a href={landscape} download="dust-and-reckoning-wallpaper.jpg" aria-label="Download Dust and Reckoning wallpaper"><Download aria-hidden="true" /> DOWNLOAD WALLPAPER</a></Button></div></section>
      </main>

      <footer className="site-footer"><div className="footer-main"><a className="brand" href="#top"><span className="brand-monogram">D<span>&</span>R</span><span className="brand-name">DUST &<br />RECKONING</span></a><nav aria-label="Footer navigation"><a href="#story">Story</a><a href="#people">People</a><a href="#arsenal">Arsenal</a><a href="#gallery">Gallery</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} DUST & RECKONING. AN ORIGINAL WESTERN CONCEPT.</span><a href="#top">BACK TO TOP ↑</a></div></footer>

      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image" onClick={() => setLightbox(null)}><Button variant="iconBare" size="icon" className="icon-control lightbox-close" aria-label="Close image" onClick={() => setLightbox(null)}><X /></Button><img src={lightbox.src} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} /></div>}
      {filmOpen && <div className="film-dialog" role="dialog" aria-modal="true" aria-label="Film information" onClick={() => setFilmOpen(false)}><div className="film-dialog-inner" onClick={(event) => event.stopPropagation()}><Button variant="iconBare" size="icon" className="icon-control" aria-label="Close" onClick={() => setFilmOpen(false)}><X /></Button><span className="eyebrow">DUST & RECKONING</span><h3>THE FILM IS COMING.</h3><p>There is no film to watch yet. In the meantime, discover the frontier in the gallery.</p><Button variant="outline" onClick={() => { setFilmOpen(false); document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' }); }}>VIEW GALLERY <ArrowRight aria-hidden="true" /></Button></div></div>}
    </>
  );
}
