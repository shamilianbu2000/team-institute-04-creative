(function(){
  var d=document,root=d.documentElement;
  root.classList.add('js');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.getElementById('yr').textContent=new Date().getFullYear();

  // menu
  var burger=d.querySelector('.burger'),ov=d.getElementById('overlay');
  function setMenu(open){
    burger.setAttribute('aria-expanded',open);
    burger.setAttribute('aria-label',open?'Close menu':'Open menu');
    if(open){ov.hidden=false;requestAnimationFrame(function(){requestAnimationFrame(function(){ov.classList.add('open')})});d.body.style.overflow='hidden';}
    else{ov.classList.remove('open');d.body.style.overflow='';setTimeout(function(){if(!ov.classList.contains('open'))ov.hidden=true},reduce?0:600);}
  }
  burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true')});
  ov.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&burger.getAttribute('aria-expanded')==='true'){setMenu(false);burger.focus()}});

  // reveal
  var items=d.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    items.forEach(function(el,i){el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});
  }else items.forEach(function(el){el.classList.add('in')});

  // FAQ
  d.querySelectorAll('.qa button').forEach(function(b){
    b.addEventListener('click',function(){
      var open=b.getAttribute('aria-expanded')==='true';
      b.setAttribute('aria-expanded',!open);
      d.getElementById(b.getAttribute('aria-controls')).classList.toggle('open',!open);
    });
  });

  // cursor
  var cur=d.querySelector('.cursor');
  if(cur&&!reduce&&window.matchMedia('(hover:hover)').matches){
    window.addEventListener('mousemove',function(e){cur.classList.add('on');cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px'});
    d.addEventListener('mouseover',function(e){cur.classList.toggle('big',!!e.target.closest('a,button,.card,.course,.tile'))});
    d.addEventListener('mouseleave',function(){cur.classList.remove('on')});
  }
})();

/* hide floating WhatsApp while hero buttons are on screen (small screens) */
(function(){
  var wa=document.querySelector('.wa'),h=document.querySelector('.hero-actions');
  if(!wa||!h||!('IntersectionObserver' in window))return;
  new IntersectionObserver(function(es){
    wa.classList.toggle('wa-hide',es[0].isIntersecting&&window.innerWidth<=900);
  }).observe(h);
})();
