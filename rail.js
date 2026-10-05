/*! ONOC rail v1.0.0
 * PLACEMENT: before </body>.
 * HOOKS: #wTrack (scroll-snap track, overflow-x:auto), #wPrev and #wNext (buttons),
 *        .athlete_card (any descendant of the track; works inside a Collection List).
 * Arrows scroll two cards. aria-disabled is set on a button at its end of the track.
 * Smooth scrolling is turned off for prefers-reduced-motion. The track itself stays
 * keyboard scrollable (tabindex=0 + role=region in the markup).
 */
(function(){
  var t=document.getElementById('wTrack'),p=document.getElementById('wPrev'),n=document.getElementById('wNext');
  if(!t||!p||!n)return;
  var mq=matchMedia('(prefers-reduced-motion: reduce)');
  function step(){var c=t.querySelector('.athlete_card');return c?(c.getBoundingClientRect().width+12)*2:t.clientWidth*.8}
  function go(d){t.scrollBy({left:d*step(),behavior:mq.matches?'auto':'smooth'})}
  function upd(){
    p.setAttribute('aria-disabled',String(t.scrollLeft<=2));
    n.setAttribute('aria-disabled',String(t.scrollLeft+t.clientWidth>=t.scrollWidth-2));
  }
  p.addEventListener('click',function(){go(-1)});
  n.addEventListener('click',function(){go(1)});
  t.addEventListener('scroll',upd,{passive:true});
  addEventListener('resize',upd);
  upd();
})();
