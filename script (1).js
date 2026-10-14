// Theme (light/dark) with localStorage
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('pref-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(theme){
    if(theme === 'dark'){
      root.setAttribute('data-theme','dark');
      toggle.setAttribute('aria-pressed','true');
    } else {
      root.removeAttribute('data-theme');
      toggle.setAttribute('aria-pressed','false');
    }
    localStorage.setItem('pref-theme', theme);
  }

  // initialize
  if(stored){
    applyTheme(stored);
  } else {
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  toggle.addEventListener('click', ()=>{
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
})();

// Hamburger menu
(function(){
  const hamb = document.getElementById('hamburger');
  hamb.addEventListener('click', ()=>{
    document.body.classList.toggle('nav-open');
    const open = document.body.classList.contains('nav-open');
    hamb.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // close nav when clicking a link (mobile)
  document.querySelectorAll('.nav a').forEach(a=>{
    a.addEventListener('click', ()=>{
      document.body.classList.remove('nav-open');
    });
  });
})();

// Smooth scroll offset for sticky header
(function(){
  const navHeight = () => {
    const header = document.querySelector('.site-header');
    return header ? header.getBoundingClientRect().height : 80;
  };

  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - navHeight() - 12;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    });
  });
})();

// Reveal on scroll using IntersectionObserver
(function(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// Back to top button
(function(){
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 400){
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
  btn.addEventListener('click', ()=>{
    window.scrollTo({top:0,behavior:'smooth'});
  });
})();

// Fill copyright year
(function(){
  const el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
})();

// Defensive: ensure no console errors if elements missing
window.addEventListener('error', function(e){
  // swallow non-fatal UI errors silently
  // (keeps page usable if something unexpected happens)
}, true);