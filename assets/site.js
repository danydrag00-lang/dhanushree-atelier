(() => {
  'use strict';
  const menu = document.querySelector('.mobile-panel');
  const toggle = document.querySelector('.mobile-toggle');
  if (menu && toggle) {
    toggle.addEventListener('click', () => {
      const open = menu.dataset.open !== 'true';
      menu.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.dataset.open = 'false'; toggle.setAttribute('aria-expanded','false');
    }));
    document.addEventListener('keydown', (e) => {if(e.key==='Escape'){menu.dataset.open='false';toggle.setAttribute('aria-expanded','false');}});
  }

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {if (e.isIntersecting) {e.target.classList.add('visible'); observer.unobserve(e.target);}});
    }, {threshold:.1, rootMargin:'0px 0px -25px 0px'});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const items = Array.from(document.querySelectorAll('[data-category]'));
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    let shown=0;
    items.forEach(card => {card.hidden = filter !== 'all' && card.dataset.category !== filter; if (!card.hidden) shown++;});
    const summary=document.getElementById('results-count');
    if (summary) summary.textContent = `${shown} selected ${shown===1?'item':'items'} shown`;
  }));

  const enquiryForm=document.getElementById('enquiry-form');
  enquiryForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data=new FormData(enquiryForm);
    const category=(data.get('category')||'Custom woodworking').toString().trim();
    const name=(data.get('name')||'').toString().trim();
    const dimension=(data.get('dimensions')||'').toString().trim();
    const finish=(data.get('finish')||'').toString().trim();
    const location=(data.get('location')||'').toString().trim();
    const details=(data.get('details')||'').toString().trim();
    const feedback=document.getElementById('form-feedback');
    if (!name || !category) {
      if(feedback)feedback.textContent='Please add your name and select a furniture type.';
      return;
    }
    const lines=[`Hello Dhanushree Timbers, I would like to enquire about custom woodwork.`,`Name: ${name}`,`Product: ${category}`];
    if(dimension)lines.push(`Approx. dimensions: ${dimension}`);
    if(finish)lines.push(`Preferred finish (subject to availability): ${finish}`);
    if(location)lines.push(`Delivery area: ${location}`);
    if(details)lines.push(`Requirements: ${details}`);
    lines.push('Please contact me to discuss options and a quotation.');
    const url='https://wa.me/919159390999?text='+encodeURIComponent(lines.join('\n'));
    if(feedback)feedback.textContent='WhatsApp will open with your message. Review it before sending.';
    window.open(url,'_blank','noopener,noreferrer');
  });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
