(function(){
  var d=document,root=d.documentElement;
  root.classList.add('js');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.getElementById('yr')&&(d.getElementById('yr').textContent=new Date().getFullYear());

  // menu (full-screen sheet, scroll lock)
  var burger=d.querySelector('.burger'),ov=d.getElementById('overlay');
  function setMenu(open){
    burger.setAttribute('aria-expanded',open);
    burger.setAttribute('aria-label',open?'Close menu':'Open menu');
    d.body.classList.toggle('menu-open',open);
    if(open){ov.hidden=false;requestAnimationFrame(function(){requestAnimationFrame(function(){ov.classList.add('open')})});d.body.style.overflow='hidden';}
    else{ov.classList.remove('open');d.body.style.overflow='';setTimeout(function(){if(!ov.classList.contains('open'))ov.hidden=true},reduce?0:600);}
  }
  burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true')});
  ov.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&burger.getAttribute('aria-expanded')==='true'){setMenu(false);burger.focus()}});
  ov.addEventListener('click',function(e){if(e.target===ov||e.target.tagName==='NAV')setMenu(false)});
  window.addEventListener('resize',function(){if(window.innerWidth>=1280&&burger.getAttribute('aria-expanded')==='true')setMenu(false)});

  // scroll-spy: highlight the nav link of the section in view (desktop bar + full-screen menu)
  var links=[].slice.call(d.querySelectorAll('#navd a, #overlay a')).filter(function(a){return /^#.+/.test(a.getAttribute('href'))&&!a.classList.contains('ov-call')});
  var ids=[];links.forEach(function(a){var id=a.getAttribute('href').slice(1);if(ids.indexOf(id)<0&&d.getElementById(id))ids.push(id)});
  var navEl=d.querySelector('.nav');
  function spy(){
    var y=window.scrollY+(navEl?navEl.offsetHeight:70)+60,cur=ids[0];
    ids.forEach(function(id){if(d.getElementById(id).getBoundingClientRect().top+window.scrollY<=y)cur=id});
    if(window.innerHeight+window.scrollY>=d.documentElement.scrollHeight-4)cur=ids[ids.length-1];
    links.forEach(function(a){var on=a.getAttribute('href')==='#'+cur;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
  }
  window.addEventListener('scroll',spy,{passive:true});window.addEventListener('resize',spy);spy();

  // reveal
  var items=d.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    items.forEach(function(el,i){el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});
  }else items.forEach(function(el){el.classList.add('in')});

  // cursor
  var cur=d.querySelector('.cursor');
  if(cur&&!reduce&&window.matchMedia('(hover:hover)').matches){
    window.addEventListener('mousemove',function(e){cur.classList.add('on');cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px'});
    d.addEventListener('mouseover',function(e){cur.classList.toggle('big',!!e.target.closest('a,button,summary,.card,.course,.tile'))});
    d.addEventListener('mouseleave',function(){cur.classList.remove('on')});
  }
})();

/* hide floating WhatsApp while hero buttons are on screen (tablet sizes; hidden on phones) */
(function(){
  var wa=document.querySelector('.wa'),h=document.querySelector('.hero-actions');
  if(!wa||!h||!('IntersectionObserver' in window))return;
  new IntersectionObserver(function(es){
    wa.classList.toggle('wa-hide',es[0].isIntersecting&&window.innerWidth<=900);
  }).observe(h);
})();
