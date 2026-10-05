/*! ONOC mega-menu v1.0.1  (mega panels, search drop, mobile menu)
 * PLACEMENT: before </body>. Replaces the older prototype inline script "onocmegamenu" v1.0.0:
 * do not apply both.
 * HOOKS:
 *   #siteHeader                      header root (receives class is-menu-open)
 *   .nav_item.mi > button            one per mega panel; needs aria-expanded="false" and
 *                                    aria-controls="<panel id>". The li gets class "open".
 *   #searchBtn + #navSearch[hidden]  search toggle (aria-expanded, aria-controls) and drop; #q2 is focused on open
 *   #menu                            mobile menu button (aria-expanded, aria-label Open/Close menu)
 *   #primary                         the menu nav; in-page links (#...) inside it close the mobile menu
 * Behaviour: hover opens a panel on hover-capable screens >= 1100px, click toggles everywhere
 * (a click straight after a hover-open is ignored for 700 ms so the panel does not flash shut).
 * Click outside closes. Esc closes the open panel and returns focus to its button, else closes the
 * search drop and focuses #searchBtn, else closes the mobile menu and focuses #menu.
 * The mobile menu locks body scroll and sets --menu-top on <html>. Closes on resize to >= 1100px.
 */
(function(){
  var h=document.getElementById('siteHeader');
  if(!h)return;
  var root=document.documentElement,
      items=[].slice.call(h.querySelectorAll('.nav_item.mi')),
      mb=document.getElementById('menu'),sb=document.getElementById('searchBtn'),
      drop=document.getElementById('navSearch'),q2=document.getElementById('q2');
  function hov(){return matchMedia('(hover:hover) and (min-width:1100px)').matches}
  function btn(m){return m.querySelector('button')}
  function closeMegas(){items.forEach(function(m){m.classList.remove('open');btn(m).setAttribute('aria-expanded','false')})}
  function closeSearch(){if(!drop)return;drop.hidden=true;if(sb)sb.setAttribute('aria-expanded','false')}
  function setMenu(o){
    h.classList.toggle('is-menu-open',o);
    if(!mb)return;
    mb.setAttribute('aria-expanded',String(o));mb.setAttribute('aria-label',o?'Close menu':'Open menu');
    if(o)root.style.setProperty('--menu-top',h.getBoundingClientRect().bottom+'px');
    document.body.style.overflow=o?'hidden':'';
  }
  items.forEach(function(m){
    var b=btn(m);
    if(!b)return;
    b.addEventListener('click',function(e){
      e.stopPropagation();
      if(m.classList.contains('open')&&Date.now()-(+m.dataset.hov||0)<700)return;
      var o=m.classList.contains('open');
      closeMegas();closeSearch();
      if(!o){m.classList.add('open');b.setAttribute('aria-expanded','true')}
    });
    m.addEventListener('mouseenter',function(){
      if(hov()){closeMegas();closeSearch();m.dataset.hov=Date.now();m.classList.add('open');b.setAttribute('aria-expanded','true')}
    });
    // keyboard: close the panel once focus leaves it (desktop only; the mobile menu manages its own focus)
    m.addEventListener('focusout',function(e){
      if(m.classList.contains('open')&&!m.contains(e.relatedTarget)&&!h.classList.contains('is-menu-open')){m.classList.remove('open');b.setAttribute('aria-expanded','false')}
    });
  });
  h.addEventListener('mouseleave',function(){if(hov())closeMegas()});
  document.addEventListener('click',function(e){if(!e.target.closest('#siteHeader')){closeMegas();closeSearch()}});
  if(sb&&drop)sb.addEventListener('click',function(){
    var o=drop.hidden;closeMegas();setMenu(false);drop.hidden=!o;sb.setAttribute('aria-expanded',String(o));
    if(o&&q2)q2.focus();
  });
  if(mb)mb.addEventListener('click',function(){var o=!h.classList.contains('is-menu-open');closeSearch();setMenu(o)});
  addEventListener('resize',function(){if(innerWidth>=1100&&h.classList.contains('is-menu-open'))setMenu(false)});
  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape')return;
    var o=items.filter(function(m){return m.classList.contains('open')})[0];
    if(o){closeMegas();btn(o).focus();return}
    if(drop&&!drop.hidden){closeSearch();if(sb)sb.focus();return}
    if(h.classList.contains('is-menu-open')){setMenu(false);if(mb)mb.focus()}
  });
  [].forEach.call(h.querySelectorAll('#primary a[href^="#"]'),function(a){
    a.addEventListener('click',function(){if(h.classList.contains('is-menu-open'))setMenu(false)});
  });
})();
