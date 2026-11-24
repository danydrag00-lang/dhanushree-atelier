/**
 * DHANUSHREE / MOTION STUDIES — Edition 04
 * Bespoke front-end choreography: product spotlight, material selector,
 * typographic sequence, scroll chapters, and optically restrained parallax.
 * No external animation dependency; all core navigation works without JS.
 */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover:hover) and (pointer:fine)');
  const clamp = (n, a=0, b=1) => Math.max(a, Math.min(b,n));
  const isMotion = () => !reduced.matches;

  // Semantic headings remain in the DOM and their text remains selectable.
  // The subtle word sequence is progressive enhancement, not a font swap.
  const headings = [...document.querySelectorAll('main h2, .footer-flex h2')]
    .filter(el => !el.closest('.legal-articles,.ms-theatre,.ms-studio,.local-faq,.store-tail'));
  if (isMotion() && 'IntersectionObserver' in window) {
    for (const title of headings) {
      // Save text nodes *before* replacing them, including those inside <em>.
      const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      let order = 0;
      for (const node of nodes) {
        const text = node.textContent;
        if (!text || !/\S/.test(text)) continue;
        const fragment = document.createDocumentFragment();
        for (const piece of text.match(/\s+|\S+/g) || []) {
          if (/^\s+$/.test(piece)) { fragment.appendChild(document.createTextNode(piece)); continue; }
          const word = document.createElement('span'); word.className='ms-word';
          const inner = document.createElement('span'); inner.className='ms-word-inner';
          inner.textContent=piece;
          word.style.setProperty('--ms-word-order', String(Math.min(order++, 15)));
          word.append(inner); fragment.append(word);
        }
        node.replaceWith(fragment);
      }
      title.classList.add('ms-kinetic');
    }
    document.documentElement.classList.add('ms-motion');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('ms-shown');
        observer.unobserve(entry.target);
      }
    }, {threshold:.06, rootMargin:'0px 0px -4% 0px'});
    headings.forEach(title=>observer.observe(title));
    reduced.addEventListener?.('change', () => {
      if (reduced.matches) {
        document.documentElement.classList.remove('ms-motion');
        headings.forEach(h=>h.classList.add('ms-shown'));
      }
    });
  }

  // Figma-like Product Spotlight: adjacent scene takes over with a real mask.
  const theatre = document.querySelector('[data-ms-theatre]');
  if (theatre) {
    const frames = [...theatre.querySelectorAll('[data-ms-theatre-image]')];
    const heading = theatre.querySelector('[data-ms-theatre-title]');
    const indexText = theatre.querySelector('[data-ms-theatre-index]');
    const description = theatre.querySelector('[data-ms-theatre-desc]');
    const count = theatre.querySelector('[data-ms-theatre-count]');
    const progress = theatre.querySelector('[data-ms-theatre-meter]');
    const copy = theatre.querySelector('.ms-theatre-copy');
    const content = [
      {index:'01 / DINING & LIVING',title:'Form meets<br><em>everyday life.</em>',text:'Tables and interiors where the character of wood becomes part of daily life.'},
      {index:'02 / REST & COMFORT',title:'The room<br><em>to unwind.</em>',text:'Considered wooden beds and bespoke furniture ideas for spaces that feel personal.'},
      {index:'03 / DOORS & DETAIL',title:'A lasting<br><em>first impression.</em>',text:'Doors, frames and architectural wood details that give an entrance its character.'}
    ];
    let active=0, switchTimer=0, clearExit=0;
    function setScene(n) {
      const next=(n+frames.length)%frames.length;
      if (next===active) return;
      const old=active; active=next;
      clearTimeout(switchTimer); clearTimeout(clearExit);
      frames[old].classList.add('is-exit');
      frames[old].classList.remove('is-active');
      frames[next].classList.remove('is-exit');
      frames[next].classList.add('is-active');
      if (isMotion()) copy.classList.add('is-switching');
      switchTimer=window.setTimeout(() => {
        indexText.textContent=content[next].index;
        heading.innerHTML=content[next].title; // Trusted, locally authored content only.
        description.textContent=content[next].text;
        count.textContent=String(next+1).padStart(2,'0');
        progress.style.transform=`scaleX(${(next+1)/frames.length})`;
        requestAnimationFrame(()=>copy.classList.remove('is-switching'));
      }, isMotion()?220:0);
      clearExit=window.setTimeout(() => frames.forEach((f,i)=>{
        if(i!==active)f.classList.remove('is-exit');
      }),1200);
    }
    theatre.querySelector('[data-ms-theatre-next]')?.addEventListener('click',()=>setScene(active+1));
    theatre.querySelector('[data-ms-theatre-prev]')?.addEventListener('click',()=>setScene(active-1));
    theatre.addEventListener('keydown', e => {
      if(!e.target.closest('[data-ms-theatre-next],[data-ms-theatre-prev]'))return;
      if (e.key==='ArrowLeft' || e.key==='ArrowRight') {
        e.preventDefault(); setScene(active+(e.key==='ArrowRight'?1:-1));
      }
    });
  }

  // A custom enquiry starts from a *visual direction*, not a fake wood finish.
  const studio = document.querySelector('[data-ms-studio]');
  if (studio) {
    const shots=[...studio.querySelectorAll('[data-ms-studio-shot]')];
    const buttons=[...studio.querySelectorAll('[data-ms-studio-option]')];
    const note=studio.querySelector('[data-ms-studio-description]');
    const descriptions=[
      'Begin with your room dimensions, preferred storage and a headboard idea.',
      'Tell us how many people you seat and the size you have in mind.',
      'Share an opening measurement and the style of door or frame you prefer.'
    ];
    buttons.forEach(button=>button.addEventListener('click',()=>{
      const value=Number(button.dataset.msStudioOption);
      buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===value)));
      shots.forEach((shot,i)=>shot.classList.toggle('is-active',i===value));
      note.textContent=descriptions[value];
    }));
  }

  // A discreet chapter index makes the scroll experience navigable. Clicking
  // always uses native scrolling and never blocks tab/history navigation.
  const isLegal = !!document.querySelector('.legal-content');
  const sections = !isLegal ? [...document.querySelectorAll('main > section')] : [];
  let chapterButtons=[];
  if (sections.length > 2) {
    const nav=document.createElement('nav');
    nav.className='ms-scene-index';
    nav.setAttribute('aria-label','Explore page sections');
    const pageLabels = {
      'index.html':['Introduction','Furniture','Material','Craft','Custom work','Our story'],
      'store.html':['Introduction','Product spotlight','Collection','Woodwork','Get in touch'],
      'custom-work.html':['Introduction','Your project','Inspiration','Design studies','Craftsmanship','Enquiry'],
      'our-story.html':['Introduction','Our approach','Woodwork','Consider the material','Our region'],
      'contact.html':['Introduction','Craftsmanship','Contact information']
    };
    const filename=location.pathname.split('/').pop()||'index.html';
    const labels=pageLabels[filename]||[];
    sections.forEach((section,i)=>{
      const button=document.createElement('button');
      button.type='button';
      const label=labels[i] || section.querySelector('h1,h2')?.textContent.trim().slice(0,40) || 'Section '+(i+1);
      button.setAttribute('aria-label',`Scroll to ${label}`);
      button.innerHTML='<span class="ms-index-label"></span><span class="ms-index-dot" aria-hidden="true"></span>';
      button.querySelector('.ms-index-label').textContent=label;
      button.addEventListener('click',()=>{
        section.scrollIntoView({behavior:isMotion()?'smooth':'auto',block:'start'});
      });
      nav.append(button); chapterButtons.push(button);
    });
    document.body.append(nav);
  }

  // One scroll-linked paint coordinates chapter progress, grain engraving,
  // architectural camera, product spotlight and photographed interludes.
  const inside = document.querySelector('.inside-hero .inside-photo');
  const insideHero = inside?.closest('.inside-hero');
  const contactPhoto = document.querySelector('.contact-photo');
  const contactHero = contactPhoto?.closest('.contact-hero');
  const films=[...document.querySelectorAll('.cine-film')];
  const grain=document.querySelector('.ms-about-grain');
  const about=grain?.closest('.about-statement');
  let pending=false;
  function paint() {
    pending=false;
    const vh=window.innerHeight||800;
    if(chapterButtons.length) {
      let current=0, dist=Infinity;
      sections.forEach((section,i)=>{
        const r=section.getBoundingClientRect();
        const d=r.top<=vh*.45 && r.bottom>=vh*.45 ? 0 : Math.min(Math.abs(r.top-vh*.45),Math.abs(r.bottom-vh*.45));
        if(d<dist){dist=d;current=i}
      });
      chapterButtons.forEach((button,i)=>{
        if(i===current)button.setAttribute('aria-current','true');
        else button.removeAttribute('aria-current');
      });
    }
    if(!isMotion())return;
    if(inside && insideHero){
      const r=insideHero.getBoundingClientRect();
      if(r.bottom>0&&r.top<vh)inside.style.setProperty('--ms-photo-y',`${(clamp(-r.top/Math.max(1,r.height))*45).toFixed(1)}px`);
    }
    if(contactPhoto && contactHero){
      const r=contactHero.getBoundingClientRect();
      if(r.bottom>0&&r.top<vh)contactPhoto.style.setProperty('--ms-contact-y',`${(-30*clamp(-r.top/Math.max(1,r.height))).toFixed(1)}px`);
    }
    if(theatre){
      const r=theatre.getBoundingClientRect();
      if(r.bottom>0&&r.top<vh){
        const t=clamp((vh-r.top)/(vh+r.height));
        theatre.style.setProperty('--ms-theatre-zoom',(1.12-.11*t).toFixed(3));
      }
    }
    for(const film of films){
      const r=film.getBoundingClientRect();
      if(r.bottom<0||r.top>vh)continue;
      const t=clamp((vh-r.top)/(vh+r.height));
      film.style.setProperty('--ms-film-zoom',(1.03+.075*t).toFixed(4));
    }
    if(grain && about){
      const r=about.getBoundingClientRect();
      if(r.bottom>0&&r.top<vh){
        const t=clamp((vh*.78-r.top)/(Math.max(1,r.height)*.83));
        grain.style.setProperty('--ms-grain-progress',t.toFixed(4));
      }
    }
  }
  function requestPaint(){if(!pending){pending=true;requestAnimationFrame(paint)}}
  addEventListener('scroll',requestPaint,{passive:true});
  addEventListener('resize',requestPaint,{passive:true});
  reduced.addEventListener?.('change',requestPaint);
  paint();

  // Pointer-responsive photographic lighting is a material interaction, not
  // random glowing spheres or an implied 360-degree model.
  if (isMotion() && pointer.matches) {
    for(const [surface, variables, amount] of [
      [theatre,['--ms-pointer-x','--ms-pointer-y'],17],
      [studio?.querySelector('.ms-studio-display'),['--ms-studio-x','--ms-studio-y'],14]
    ]) {
      if(!surface)continue;
      surface.addEventListener('pointermove', e=>{
        const r=surface.getBoundingClientRect();
        const x=(e.clientX-r.left)/Math.max(1,r.width)-.5;
        const y=(e.clientY-r.top)/Math.max(1,r.height)-.5;
        surface.style.setProperty(variables[0],`${(x*amount).toFixed(2)}px`);
        surface.style.setProperty(variables[1],`${(y*amount).toFixed(2)}px`);
      },{passive:true});
      surface.addEventListener('pointerleave',()=>variables.forEach(v=>surface.style.removeProperty(v)));
    }
    document.querySelectorAll('.product-card').forEach(card=>{
      const img=card.querySelector('.product-photo img');
      if(!img)return;
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect();
        img.style.setProperty('--ms-card-x',`${(((e.clientX-r.left)/r.width-.5)*-11).toFixed(1)}px`);
        img.style.setProperty('--ms-card-y',`${(((e.clientY-r.top)/r.height-.5)*-11).toFixed(1)}px`);
      },{passive:true});
      card.addEventListener('pointerleave',()=>{
        img.style.removeProperty('--ms-card-x');img.style.removeProperty('--ms-card-y');
      });
    });
  }
})();