/*! ONOC games v1.0.0  (Road to the Games)
 * PLACEMENT: before </body> (home page; also safe site-wide, exits if the section is missing).
 * HOOKS (class names from the comp):
 *   .section_games        section root (gets the branded background layers)
 *   .games_bg             empty div, aria-hidden. Layers are generated from the cards if it has no children.
 *   .games_list           the row/grid that holds the cards (the Collection List wrapper's list)
 *   .game                 one per Games item (the Collection List item), containing:
 *       .game_count        countdown markup with <b data-u="d|h|m|s"> children
 *       .game_range        (optional) text; filled from data-range when empty
 *       .game_emblem img   first img is the Olympic emblem, used as the layer logo
 *   .games_news           (optional) related-news link; receives the next Games colours
 * REQUIRED ATTRIBUTES on .game (bind to CMS fields with the attribute settings):
 *   data-start  ISO date-time, Games start        e.g. 2026-10-31T00:00:00Z   (CMS start date)
 *   data-name   Games name, used in the timer's accessible name                (CMS name)
 *   data-c1, data-c2   brand colours, e.g. #E8352B                           (CMS brand colour 1/2)
 * OPTIONAL: data-end (ISO, enables "Under way"), data-range ("31 Oct - 13 Nov 2026"),
 *           data-logo (layer logo URL, overrides the first emblem).
 * Dates without an offset are read in the visitor's local time; send a Z or +hh:mm offset.
 * Behaviour: next = earliest Games whose start is in the future. It is moved to the top row and
 * gets class is-live, role=timer and a live d/h/m/s countdown. Other cards show a day count, then
 * "Under way" (between start and end) or "Completed". With no upcoming Games a .games-empty line
 * is shown and the row gets class no-next. Hover, focus or tap on a card switches the background
 * layer; leaving returns to the next Games. Number changes flip unless reduced motion is set.
 * Extra: any element with data-days-to="<ISO>" gets "N days" text.
 * TEST: on localhost or *.webflow.io, ?now=2026-11-01 shifts the clock.
 */
(function(){
  var sec=document.querySelector('.section_games'),row=sec&&sec.querySelector('.games_list');
  if(!row)return;
  var els=[].slice.call(row.querySelectorAll('.game'));
  if(!els.length)return;
  var mq=matchMedia('(prefers-reduced-motion: reduce)');
  var q=/^(localhost|127\.0\.0\.1|.*\.webflow\.io)$/.test(location.hostname)&&new URLSearchParams(location.search).get('now');
  var off=q&&!isNaN(Date.parse(q))?Date.parse(q)-Date.now():0;
  function now(){return Date.now()+off}
  var g=els.map(function(el,k){return{el:el,k:k,s:Date.parse(el.dataset.start),e:Date.parse(el.dataset.end)}});

  g.forEach(function(x){
    var c1=x.el.dataset.c1,c2=x.el.dataset.c2;
    if(c1)x.el.style.setProperty('--c1',c1);
    if(c2)x.el.style.setProperty('--c2',c2);
    var r=x.el.querySelector('.game_range');
    if(r&&x.el.dataset.range&&!r.textContent.trim())r.textContent=x.el.dataset.range;
  });

  var bg=sec.querySelector('.games_bg');
  if(bg&&!bg.children.length){
    g.forEach(function(x){
      var l=document.createElement('div'),m=x.el.querySelector('.game_emblem img'),u=x.el.dataset.logo||(m&&m.getAttribute('src'));
      l.className='games_layer';
      l.style.setProperty('--c1',x.el.style.getPropertyValue('--c1'));
      l.style.setProperty('--c2',x.el.style.getPropertyValue('--c2'));
      if(u)l.style.setProperty('--logo','url("'+u.replace(/"/g,'%22')+'")');
      bg.appendChild(l);
    });
  }
  var layers=bg?[].slice.call(bg.querySelectorAll('.games_layer')):[];
  function setG(k){layers.forEach(function(l,n){l.classList.toggle('is-on',n===k)})}

  var next=null;
  g.forEach(function(x){if(x.s>now()&&(!next||x.s<next.s))next=x});
  var news=sec.querySelector('.games_news');
  g.forEach(function(x){
    x.el.classList.remove('is-live');
    var c=x.el.querySelector('.game_count');
    if(c){c.removeAttribute('role');c.removeAttribute('aria-label')}
  });
  if(next){
    next.el.classList.add('is-live');
    if(row.firstElementChild!==next.el)row.prepend(next.el);
    var nc=next.el.querySelector('.game_count');
    if(nc){nc.setAttribute('role','timer');nc.setAttribute('aria-label','Time until '+(next.el.dataset.name||'the next Games'))}
    if(news){news.style.setProperty('--c1',next.el.style.getPropertyValue('--c1'));news.style.setProperty('--c2',next.el.style.getPropertyValue('--c2'))}
  }else{
    row.classList.add('no-next');
    row.insertAdjacentHTML('beforebegin','<p class="games-empty">The next Games dates will be announced soon. Past editions are listed below.</p>');
  }
  var live=next?next.k:0;
  setG(live);
  g.forEach(function(x){
    ['mouseenter','focusin','pointerdown'].forEach(function(ev){x.el.addEventListener(ev,function(){setG(x.k)})});
    x.el.addEventListener('mouseleave',function(){setG(live)});
  });
  row.addEventListener('focusout',function(e){if(!row.contains(e.relatedTarget))setG(live)});

  function pad(n){return String(n).padStart(2,'0')}
  function put(e,v){
    if(e.textContent===v)return;
    e.textContent=v;
    if(!mq.matches){e.classList.remove('flip');void e.offsetWidth;e.classList.add('flip')}
  }
  function tick(){
    var n=now();
    g.forEach(function(x){
      if(isNaN(x.s))return;
      var cnt=x.el.querySelector('.game_count');
      if(!cnt)return;
      if(x===next){
        var s=Math.floor(Math.max(0,x.s-n)/1e3),v={d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),s:s%60};
        [].forEach.call(cnt.querySelectorAll('[data-u]'),function(e){put(e,e.dataset.u==='d'?v.d.toLocaleString('en'):pad(v[e.dataset.u]))});
      }else{
        var d=Math.ceil((x.s-n)/864e5),e=cnt.querySelector('[data-u=d]');
        if(d>0){if(e)put(e,d.toLocaleString('en'))}
        else{
          var st=n<x.e?'Under way':'Completed';
          if(cnt.dataset.done!==st){cnt.dataset.done=st;cnt.innerHTML='<div class="unit"><span class="done">'+st+'</span></div>'}
        }
      }
    });
    [].forEach.call(document.querySelectorAll('[data-days-to]'),function(e){
      var d=Math.ceil((Date.parse(e.dataset.daysTo)-n)/864e5);
      e.textContent=d>0?d.toLocaleString('en')+(d===1?' day':' days'):'Under way';
    });
  }
  tick();
  setInterval(tick,1000);
})();
