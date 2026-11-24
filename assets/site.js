/** Dhanushree Atelier / Motion system — native, no remote animation dependencies. */
(() => {
  'use strict';
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  document.documentElement.classList.add('js-motion');
  const header=document.querySelector('[data-header]');
  const menuButton=document.querySelector('.menu-toggle');
  const mobileMenu=document.querySelector('.mobile-menu');
  const scrollBar=document.querySelector('.scroll-bar');
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const toggleMenu=(open)=>{
    if(!menuButton||!mobileMenu)return;
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');
    mobileMenu.classList.toggle('is-open',open);
    header?.classList.toggle('menu-is-open',open);
    document.body.style.overflow=open?'hidden':'';
    if(open)mobileMenu.querySelector('a')?.focus();
  };
  menuButton?.addEventListener('click',()=>toggleMenu(menuButton.getAttribute('aria-expanded')!=='true'));
  mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')toggleMenu(false)});

  // A single rAF scheduler coordinates viewport progress, image depth and sticky navigation.
  let ticking=false;
  const updateScroll=()=>{
    const sy=window.scrollY;
    const total=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    scrollBar && (scrollBar.style.transform=`scaleX(${clamp(sy/total,0,1)})`);
    header?.classList.toggle('is-scrolled',sy>42);
    if(!reduced.matches){
      document.querySelectorAll('.parallax-wrap').forEach(wrap=>{
        const rect=wrap.getBoundingClientRect();
        if(rect.bottom<0||rect.top>window.innerHeight)return;
        const t=(window.innerHeight-rect.top)/(window.innerHeight+rect.height);
        const img=wrap.querySelector('.parallax-img');
        if(img)img.style.setProperty('--py',`${(-9+t*10).toFixed(2)}%`);
      });
    }
    ticking=false;
  };
  const requestScroll=()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll)}};
  window.addEventListener('scroll',requestScroll,{passive:true});
  window.addEventListener('resize',requestScroll,{passive:true});
  updateScroll();

  // Visible on entry with progressive enhancement (elements remain visible without JS).
  const reveals=[...document.querySelectorAll('[data-reveal]')];
  if(reduced.matches||!('IntersectionObserver'in window))reveals.forEach(el=>el.classList.add('is-visible'));
  else {
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}
    }),{threshold:.1,rootMargin:'0px 0px -20px 0px'});
    reveals.forEach(el=>observer.observe(el));
  }

  // Real cinematic hero sequence: slide crossfades, Ken Burns camera, timed progress.
  const hero=document.querySelector('[data-cinema-hero]');
  // Dedicated film playback owns the hero when the supplied video is present.
  if(hero && !hero.querySelector('[data-hero-video]')){
    const scenes=[...hero.querySelectorAll('.hero-scene')];
    const titles=['Solid timber dining · Concept imagery','Custom furniture · Design inspiration','Doors & frames · Design inspiration'];
    const current=hero.querySelector('[data-slide-current]');
    const label=hero.querySelector('[data-slide-title]');
    const bar=hero.querySelector('[data-hero-progress]');
    const pauseButton=hero.querySelector('[data-hero-pause]');
    let slide=0,paused=reduced.matches,elapsed=0,last=0,raf=0;
    const interval=6500;
    const setSlide=(n)=>{
      slide=(n+scenes.length)%scenes.length;
      scenes.forEach((s,i)=>s.classList.toggle('is-current',i===slide));
      current && (current.textContent=String(slide+1).padStart(2,'0'));
      label && (label.textContent=titles[slide]);
      elapsed=0;
      if(bar)bar.style.transform='scaleX(0)';
    };
    const updatePause=()=>{
      if(!pauseButton)return;
      pauseButton.setAttribute('aria-pressed',String(paused));
      pauseButton.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');
      pauseButton.textContent=paused?'▶':'Ⅱ';
    };
    const tick=(now)=>{
      if(!last)last=now;
      const dt=clamp(now-last,0,100);
      last=now;
      if(!paused && !document.hidden){
        elapsed+=dt;
        if(elapsed>=interval)setSlide(slide+1);
        if(bar)bar.style.transform=`scaleX(${clamp(elapsed/interval,0,1)})`;
      }
      raf=requestAnimationFrame(tick);
    };
    hero.querySelector('[data-hero-next]')?.addEventListener('click',()=>setSlide(slide+1));
    hero.querySelector('[data-hero-prev]')?.addEventListener('click',()=>setSlide(slide-1));
    pauseButton?.addEventListener('click',()=>{paused=!paused;updatePause()});
    // When the hero is off screen we pause visual work and resume when returning.
    if('IntersectionObserver'in window){
      const io=new IntersectionObserver(es=>{
        const isVisible=es[0]?.isIntersecting;
        if(!isVisible){last=0}
      },{threshold:0}); io.observe(hero);
    }
    let mx=.67,my=.5;
    hero.addEventListener('pointermove',e=>{
      if(reduced.matches||e.pointerType==='touch')return;
      const r=hero.getBoundingClientRect();
      mx=clamp((e.clientX-r.left)/r.width,0,1);my=clamp((e.clientY-r.top)/r.height,0,1);
      hero.style.setProperty('--mx',`${(mx*100).toFixed(1)}%`);
      hero.style.setProperty('--my',`${(my*100).toFixed(1)}%`);
    },{passive:true});
    setSlide(0);updatePause();
    if(!reduced.matches)raf=requestAnimationFrame(tick);
    window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
  }

  // Smooth, usable, horizontally scrolling collection; accessible controls.
  const track=document.querySelector('[data-collection-track]');
  const scrollCards=(dir)=>{
    if(!track)return;
    const card=track.querySelector('.collection-tile');
    const gap=parseInt(getComputedStyle(track).gap)||0;
    track.scrollBy({left:dir*((card?.getBoundingClientRect().width||300)+gap),behavior:reduced.matches?'instant':'smooth'});
  };
  document.querySelector('[data-track-next]')?.addEventListener('click',()=>scrollCards(1));
  document.querySelector('[data-track-prev]')?.addEventListener('click',()=>scrollCards(-1));

  // Product filters update real results and live count.
  const filters=[...document.querySelectorAll('[data-filter]')];
  const items=[...document.querySelectorAll('.product-card[data-category]')];
  filters.forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    let count=0;
    filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    items.forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;if(!card.hidden)count++});
    const status=document.getElementById('results-count');
    if(status)status.textContent=`${count} selected ${count===1?'item':'items'} shown`;
  }));

  // Keep images graceful when a third-party photo host is unavailable.
  const fallbackPhotos={
    '5178074':'hero-bedroom.webp','7027772':'hero-dining.webp',
    '6782465':'hero-wardrobe.webp','10099331':'hero-doors.webp',
    '14975208':'hero-workshop.webp'
  };
  document.querySelectorAll('img[src*="images.pexels.com"]').forEach(img=>{
    const pid=(img.getAttribute('src')||'').match(/photos\/(\d+)/)?.[1];
    const fallback=pid?fallbackPhotos[pid]:null;
    const fail=()=>{
      if(fallback){img.src='assets/'+fallback}
      else {img.style.opacity='0';img.closest('.photo-frame,.product-photo,.parallax-wrap')?.classList.add('photo-unavailable')}
    };
    img.addEventListener('error',fail,{once:true});
    if(img.complete&&!img.naturalWidth)fail();
  });

  // Custom-brief form: opens the completed message; no server or secret form storage.
  const form=document.getElementById('enquiry-form');
  form?.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const v=new FormData(form),get=k=>String(v.get(k)||'').trim();
    const lines=['Hello Dhanushree Timbers, I would like to enquire about custom woodwork.',`Name: ${get('name')}`,`Product: ${get('category')}`];
    [['dimensions','Approx. dimensions'],['finish','Preferred timber / finish'],['location','Delivery area'],['details','Requirements']].forEach(([key,label])=>get(key)&&lines.push(`${label}: ${get(key)}`));
    lines.push('Please contact me to discuss my requirements and a quotation.');
    const href='https://wa.me/919159390999?text='+encodeURIComponent(lines.join('\n'));
    const feedback=document.getElementById('form-feedback');
    if(feedback)feedback.textContent='Your enquiry is prepared. Review and send it in WhatsApp.';
    const popup=window.open(href,'_blank','noopener,noreferrer');
    if(feedback){feedback.innerHTML='Your enquiry is prepared. <a href="'+href.replace(/&/g,'&amp;')+'" target="_blank" rel="noopener noreferrer">Open your WhatsApp message ↗</a>'}
  });

  // Very restrained magnetic offset on desktop buttons only.
  if(!reduced.matches&&matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.querySelectorAll('[data-magnetic]').forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.13,y=(e.clientY-r.top-r.height/2)*.13;
        el.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      },{passive:true});
      el.addEventListener('pointerleave',()=>{el.style.transform='';});
    });
  }
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
})();
(()=>{const footer=document.querySelector('.footer');if(!footer||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const video=document.createElement('video');video.className='footer-film';video.muted=true;video.defaultMuted=true;video.loop=true;video.playsInline=true;video.preload='none';video.setAttribute('aria-hidden','true');video.src='assets/motionsites-background-98f359af.mp4';video.addEventListener('error',()=>video.remove(),{once:true});footer.prepend(video);if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)video.play().catch(()=>{});else video.pause()}},{rootMargin:'200px'});observer.observe(footer)}else video.play().catch(()=>{});})();

(()=>{const v=document.querySelector('.story-film-video');if(!v||matchMedia('(prefers-reduced-motion: reduce)').matches)return;v.muted=true;v.addEventListener('playing',()=>v.classList.add('is-playing'));v.addEventListener('error',()=>v.classList.remove('is-playing'));const play=()=>{if(!v.getAttribute('src'))v.src=v.dataset.src;v.play().catch(()=>{})};if('IntersectionObserver'in window){const o=new IntersectionObserver(e=>{for(const x of e){if(x.isIntersecting)play();else v.pause()}},{rootMargin:'150px'});o.observe(v)}else play()})();
