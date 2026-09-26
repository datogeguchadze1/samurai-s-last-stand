import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type MouseEvent } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight, Instagram, Menu, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ronin from '@/assets/ronin.png';
import forest from '@/assets/forest.jpg';
import battle from '@/assets/battle.jpg';
import katana from '@/assets/katana.jpg';
import warriorRed from '@/assets/warrior-red.jpg';
import warriorShadow from '@/assets/warrior-shadow.jpg';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'LAST — The Path of the Ronin' },
      { name: 'description', content: 'Enter the world of LAST, a cinematic samurai experience forged in shadow and steel.' },
      { property: 'og:title', content: 'LAST — The Path of the Ronin' },
      { property: 'og:description', content: 'Enter the world of LAST, a cinematic samurai experience forged in shadow and steel.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Index,
});

const nav = [
  { label: 'Catalog', href: '#warriors' },
  { label: 'News', href: '#news' },
  { label: 'History', href: '#story' },
];

const crows = [
  { left: '66%', top: '7%', size: '11vw', rotate: '-19deg', duration: '5s', delay: '-1s' },
  { left: '78%', top: '1%', size: '10vw', rotate: '17deg', duration: '6s', delay: '-2s' },
  { left: '73%', top: '27%', size: '6vw', rotate: '23deg', duration: '4.5s', delay: '-3s' },
  { left: '84%', top: '34%', size: '4vw', rotate: '-13deg', duration: '7s', delay: '-1.5s' },
  { left: '60%', top: '43%', size: '3vw', rotate: '20deg', duration: '5.5s', delay: '-4s' },
  { left: '91%', top: '18%', size: '3.5vw', rotate: '12deg', duration: '6.5s', delay: '-2.5s' },
];

const warriors = [
  { name: 'The Ronin', role: 'The wanderer', detail: 'A blade without a master. A past without mercy.', image: ronin, power: '94', agility: '87' },
  { name: 'Akari', role: 'The flame', detail: 'She carries a kingdom’s final promise.', image: warriorRed, power: '89', agility: '92' },
  { name: 'Kage', role: 'The shadow', detail: 'The last thing his enemies never see.', image: warriorShadow, power: '81', agility: '98' },
];

const weapons = [
  { name: 'Kurokaze', type: 'The black wind', description: 'Forged for a hand that never hesitates. Its edge has passed from one fallen master to the next.', damage: '96 / 100', speed: '82 / 100', image: katana },
  { name: 'Shirogane', type: 'The silver oath', description: 'An heirloom blade carried through generations of silence, sharpened by duty and loss.', damage: '88 / 100', speed: '94 / 100', image: katana },
  { name: 'Akatsuki', type: 'The crimson dawn', description: 'A sword whose legend begins where every other story ends: at the edge of a new day.', damage: '92 / 100', speed: '89 / 100', image: katana },
];

const news = [
  { date: 'FIELD NOTES · 01', title: 'A world shaped by every choice', text: 'Walk a land where every path leaves a mark, and every encounter asks what honor is worth.' },
  { date: 'FIELD NOTES · 02', title: 'The art of the blade', text: 'A closer look at the steel, the stance, and the silence before the first strike.' },
  { date: 'FIELD NOTES · 03', title: 'Beyond the mist', text: 'From towering cedars to forgotten battlegrounds, discover the atmosphere of LAST.' },
];

function Crow({ index }: { index: number }) {
  const bird = crows[index];
  if (!bird) return null;
  return (
    <span className="crow" style={{ '--left': bird.left, '--top': bird.top, '--size': bird.size, '--rotate': bird.rotate, '--duration': bird.duration, '--delay': bird.delay } as React.CSSProperties}>
      <svg viewBox="0 0 120 58" aria-hidden="true"><path fill="currentColor" d="M60 35C50 25 40 19 26 16 17 14 11 8 1 0c5 15 15 26 27 32-8-2-15-3-22-2 13 8 27 10 40 11l14 13 14-13c13-1 27-3 40-11-7-1-14 0-22 2 12-6 22-17 27-32-10 8-16 14-25 16-14 3-24 9-34 19Z" /></svg>
    </span>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [weaponIndex, setWeaponIndex] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null);
  const weapon = weapons[weaponIndex] ?? weapons[0];
  if (!weapon) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightbox || trailerOpen ? 'hidden' : '';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); setLightbox(null); setTrailerOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [menuOpen, lightbox, trailerOpen]);

  function onDownloadClick(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setRipple({ x: event.clientX - rect.left, y: event.clientY - rect.top, key: Date.now() });
  }

  return (
    <>
      <header className={`site-nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <a className="brand" href="#top" aria-label="GAME home">G<span className="brand-a" aria-hidden="true" />ME</a>
        <nav className="nav-links" aria-label="Main navigation">{nav.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}</nav>
        <Button variant="iconBare" size="icon" className="menu-trigger icon-control" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>
      {menuOpen && <div className="menu-panel" role="dialog" aria-modal="true" aria-label="Navigation menu">{[{ label: 'Home', href: '#top' }, ...nav, { label: 'Weapons', href: '#weapons' }, { label: 'Gallery', href: '#gallery' }].map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</div>}

      <main>
        <section className="hero" id="top" aria-label="LAST game introduction">
          <div className="hero-bg" style={{ backgroundImage: `url(${forest})` }} />
          <div className="diagonal-band" />
          <div className="fog fog-one" /><div className="fog fog-two" />
          <div className="crows" aria-hidden="true">{crows.map((_, i) => <Crow key={i} index={i} />)}</div>
          <img className="hero-character" src={ronin} alt="Lone samurai in a straw hat with two swords" width={1024} height={1536} />
          <div className="dust" /><div className="hero-vignette" />
          <div className="glass-quote"><p>Are you ready to show your strength and fight with powerful warriors to take the place of the supreme?</p></div>
          <h1 className="hero-title">LAST</h1>
          <div className="download-wrap"><a className="download-button inline-flex items-center justify-center" href={battle} download="LAST-wallpaper.jpg" onClick={onDownloadClick} aria-label="Download LAST wallpaper">DOWNLOAD{ripple && <span key={ripple.key} className="ripple" style={{ left: ripple.x, top: ripple.y }} />}</a></div>
          <div className="hero-bottom">
            <div className="platforms"><small>Available Platforms</small><div className="platform-icons"><span title="Windows">⊞</span><span title="PlayStation">PS</span></div><div className="social-links"><a href="#gallery" aria-label="View gallery"><Instagram /></a><a href="#news" aria-label="View news"><ChevronRight /></a></div></div>
            <a className="next-link" href="#story">Next <ArrowRight /></a>
          </div>
        </section>

        <section className="section story-section" id="story">
          <img className="story-image" src={battle} alt="Two samurai facing each other in a misty valley" loading="lazy" width={1536} height={1024} />
          <div className="section-inner"><div className="story-copy reveal"><span className="eyebrow">The story</span><h2 className="section-heading">A legend is<br />never given.</h2><p className="section-lead">In a land caught between honor and survival, a nameless warrior walks the path no one else would choose.</p><div className="timeline"><div className="timeline-item"><strong>01 / Exile</strong><span>Every journey begins with a loss.</span></div><div className="timeline-item"><strong>02 / Reckoning</strong><span>Every choice carries a cost.</span></div><div className="timeline-item"><strong>03 / Legacy</strong><span>Only the last story survives.</span></div></div></div></div>
        </section>

        <section className="section warriors-section" id="warriors"><div className="section-inner"><div className="section-topline reveal"><div><span className="eyebrow">Choose your fate</span><h2 className="section-heading">The warriors</h2></div><span className="section-index">01 — 03</span></div><div className="warrior-grid">{warriors.map((warrior) => <article className="warrior-card reveal" key={warrior.name}><img src={warrior.image} alt={warrior.name} loading="lazy" width={1024} height={1280} /><div className="warrior-info"><small>{warrior.role}</small><h3>{warrior.name}</h3><p>{warrior.detail}</p><div className="stat-row"><span>POWER <b>{warrior.power}</b></span><span>AGILITY <b>{warrior.agility}</b></span></div></div></article>)}</div></div></section>

        <section className="section weapon-section" id="weapons"><div className="section-inner"><div className="section-topline reveal"><div><span className="eyebrow">Forged in shadow</span><h2 className="section-heading">The arsenal</h2></div><span className="section-index">0{weaponIndex + 1} — 0{weapons.length}</span></div><div className="weapon-view reveal"><div className="weapon-visual"><img src={weapon.image} alt="Japanese katana on dark stone" loading="lazy" width={1536} height={1024} /></div><div className="weapon-detail"><span className="eyebrow">{weapon.type}</span><h3>{weapon.name}</h3><p>{weapon.description}</p><div className="weapon-stats"><div><span>Damage</span><b>{weapon.damage}</b></div><div><span>Speed</span><b>{weapon.speed}</b></div></div><div className="weapon-controls"><Button variant="square" size="icon" className="square-control" aria-label="Previous weapon" onClick={() => setWeaponIndex((weaponIndex + weapons.length - 1) % weapons.length)}><ArrowLeft /></Button><Button variant="square" size="icon" className="square-control" aria-label="Next weapon" onClick={() => setWeaponIndex((weaponIndex + 1) % weapons.length)}><ArrowRight /></Button></div></div></div></div></section>

        <section className="section news-section" id="news"><div className="section-inner"><div className="section-topline reveal"><div><span className="eyebrow">From the world of LAST</span><h2 className="section-heading">Journal</h2></div><span className="section-index">LATEST STORIES</span></div><div className="news-grid">{news.map((item) => <article className="news-card reveal" key={item.title}><small>{item.date}</small><h3>{item.title}</h3><p>{item.text}</p><a href="#gallery">Explore more <ArrowRight /></a></article>)}</div></div></section>

        <section className="section gallery-section" id="gallery"><div className="section-inner"><div className="section-topline reveal"><div><span className="eyebrow">A world worth remembering</span><h2 className="section-heading">Gallery</h2></div><span className="section-index">SELECTED FRAMES</span></div><div className="gallery-grid reveal">{[{ src: battle, alt: 'Samurai duel in a misty valley' }, { src: forest, alt: 'Dark forest at night' }, { src: katana, alt: 'Katana on a stone surface' }].map((item) => <Button variant="image" key={item.alt} className="gallery-tile" aria-label={`Enlarge ${item.alt}`} onClick={() => setLightbox(item.src)}><img src={item.src} alt={item.alt} loading="lazy" width={1536} height={1024} /></Button>)}</div></div></section>

        <section className="trailer-section" id="trailer"><img src={battle} alt="" loading="lazy" width={1536} height={1024} /><div className="trailer-content reveal"><span className="eyebrow">The world awaits</span><h2 className="section-heading">Become the last.</h2><Button variant="play" className="play-button" aria-label="View trailer information" onClick={() => setTrailerOpen(true)}><Play fill="currentColor" /></Button></div></section>
      </main>

      <footer className="site-footer"><div className="footer-main"><a className="brand" href="#top">G<span className="brand-a" aria-hidden="true" />ME</a><nav aria-label="Footer navigation"><a href="#story">Story</a><a href="#warriors">Warriors</a><a href="#weapons">Weapons</a><a href="#gallery">Gallery</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} LAST. A cinematic concept experience.</span><a href="#top">Back to top ↑</a></div></footer>

      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image" onClick={() => setLightbox(null)}><Button variant="iconBare" size="icon" className="icon-control lightbox-close" aria-label="Close image" onClick={() => setLightbox(null)}><X /></Button><img src={lightbox} alt="Expanded gallery scene" onClick={(event) => event.stopPropagation()} /></div>}
      {trailerOpen && <div className="trailer-dialog" role="dialog" aria-modal="true" aria-label="Trailer information" onClick={() => setTrailerOpen(false)}><div className="trailer-dialog-inner" onClick={(event) => event.stopPropagation()}><Button variant="iconBare" size="icon" className="icon-control" aria-label="Close" onClick={() => setTrailerOpen(false)}><X /></Button><span className="eyebrow">LAST</span><h3>Coming soon</h3><p>The trailer has not been released yet. Until then, explore the world in the gallery.</p><Button variant="outline" onClick={() => { setTrailerOpen(false); document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' }); }}>View gallery</Button></div></div>}
    </>
  );
}
