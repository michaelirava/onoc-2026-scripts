/*! ONOC spotlight v1.0.0
 * PLACEMENT: before </body>.
 * HOOKS (class names from the comp; build the slides with a Collection List, Featured + sort order):
 *   .spot                      carousel root
 *   .slide                     one per item. Slide 1 should be in the HTML with a real src (LCP);
 *                              later slides may use data-src="<url>" and are loaded on idle.
 *   .slide_caption             the link inside each slide (made focusable only when active)
 *   .hero_controls             wrapper, hidden when there is only one slide
 *   .hero_tabs                 holder for the dashes. If it has no .hero_tab children they are
 *                              generated: <button class="hero_tab">01<span class="hero_tab-bar"></span></button>
 *                              (label taken from the slide's .label text)
 *   #spPause (or .hero_pause)  pause/play button; aria-label flips Pause spotlight / Play spotlight
 * Classes written: slide.is-active, tab.is-active (restarts the CSS progress bar), .spot.paused
 * (hover/focus), .spot.is-static (paused by the user or reduced motion).
 * ARIA written: aria-hidden on inactive slides, aria-current on tabs, role/aria-roledescription/
 * aria-label ("2 of 5") on slides and the region if missing.
 * Behaviour: advances every 6.5 s (override: data-interval="ms" on .spot), pauses on hover, focus
 * and hidden tab, and does not autoplay when prefers-reduced-motion is set (user can press Play).
 */
(function(){
  var spot=document.querySelector('.spot');
  if(!spot)return;
  var sl=[].slice.call(spot.querySelectorAll('.slide'));
  if(!sl.length)return;
  function load(s){var m=s&&s.querySelector('img[data-src]');if(m){m.src=m.dataset.src;m.removeAttribute('data-src')}}
  function loadAll(){sl.forEach(load)}
  function idle(){'requestIdleCallback' in window?requestIdleCallback(loadAll,{timeout:3000}):setTimeout(loadAll,1500)}
  document.readyState==='complete'?idle():addEventListener('load',idle);

  var ctl=spot.querySelector('.hero_controls');
  if(sl.length<2){if(ctl)ctl.hidden=true;return}

  if(!spot.hasAttribute('role')){spot.setAttribute('role','region');spot.setAttribute('aria-roledescription','carousel')}
  if(!spot.hasAttribute('aria-label'))spot.setAttribute('aria-label','Spotlight');
  sl.forEach(function(s,n){
    if(!s.hasAttribute('role')){s.setAttribute('role','group');s.setAttribute('aria-roledescription','slide')}
    if(!s.hasAttribute('aria-label'))s.setAttribute('aria-label',(n+1)+' of '+sl.length);
  });

  var tabs=[].slice.call(spot.querySelectorAll('.hero_tab')),box=spot.querySelector('.hero_tabs');
  if(!tabs.length&&box){
    sl.forEach(function(s,n){
      var c=s.querySelector('.label'),b=document.createElement('button');
      b.type='button';b.className='hero_tab';
      b.setAttribute('aria-label','Show slide '+(n+1)+(c?': '+c.textContent.trim():''));
      b.appendChild(document.createTextNode(n<9?'0'+(n+1):String(n+1)));
      var bar=document.createElement('span');bar.className='hero_tab-bar';bar.setAttribute('aria-hidden','true');
      b.appendChild(bar);box.appendChild(b);tabs.push(b);
    });
  }
  if(tabs.length!==sl.length)return;

  var pb=spot.querySelector('#spPause')||spot.querySelector('.hero_pause');
  var ms=parseInt(spot.getAttribute('data-interval'),10)||6500;
  var mq=matchMedia('(prefers-reduced-motion: reduce)');
  var i=Math.max(0,sl.findIndex(function(s){return s.classList.contains('is-active')})),timer=null,user=mq.matches;

  function show(n){
    n=(n+sl.length)%sl.length;
    load(sl[n]);
    sl.forEach(function(s,k){
      var on=k===n,c=s.querySelector('.slide_caption');
      s.classList.toggle('is-active',on);
      on?s.removeAttribute('aria-hidden'):s.setAttribute('aria-hidden','true');
      if(c)c.tabIndex=on?0:-1;
      tabs[k].classList.remove('is-active');tabs[k].setAttribute('aria-current','false');
    });
    i=n;void tabs[i].offsetWidth;
    tabs[i].classList.add('is-active');tabs[i].setAttribute('aria-current','true');
  }
  function stop(){clearInterval(timer);timer=null}
  function start(){stop();if(user)return;spot.classList.remove('paused');timer=setInterval(function(){show(i+1)},ms)}
  function setUser(p){
    user=p;spot.classList.toggle('is-static',p);
    if(pb)pb.setAttribute('aria-label',p?'Play spotlight':'Pause spotlight');
    p?stop():start();
  }
  tabs.forEach(function(t,n){t.addEventListener('click',function(){show(n);start()})});
  if(pb)pb.addEventListener('click',function(){setUser(!user)});
  spot.addEventListener('mouseenter',function(){stop();spot.classList.add('paused')});
  spot.addEventListener('mouseleave',function(){if(!user)start()});
  spot.addEventListener('focusin',function(){stop();spot.classList.add('paused')});
  spot.addEventListener('focusout',function(e){if(!spot.contains(e.relatedTarget)&&!user)start()});
  document.addEventListener('visibilitychange',function(){document.hidden?stop():(!user&&start())});
  show(i);setUser(user);
})();
