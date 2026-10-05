/*! ONOC reveal v1.0.0  (extra: scroll reveal)
 * PLACEMENT: before </body>.
 * HOOKS: [data-reveal] elements. CSS hides them only under  .js [data-reveal]  (set by
 * theme-init.js) and shows them with .is-in. Stagger comes from the CSS variable --d.
 * With prefers-reduced-motion or no IntersectionObserver, everything is shown at once.
 */
(function(){
  var els=[].slice.call(document.querySelectorAll('[data-reveal]'));
  if(!els.length)return;
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){
    els.forEach(function(e){e.classList.add('is-in')});return;
  }
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}})},
    {rootMargin:'0px 0px -8% 0px',threshold:.05});
  els.forEach(function(e){io.observe(e)});
})();
