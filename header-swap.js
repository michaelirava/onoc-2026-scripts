/*! ONOC header-swap v1.0.0
 * PLACEMENT: before </body>.
 * HOOKS: #siteHeader (the sticky header).
 * OPTIONAL ATTR: data-solid-at="0.6"  fraction of viewport height (default 0.6).
 * Toggles class "is-solid" on #siteHeader once scrollY > innerHeight * solid-at, or while
 * "is-menu-open" is on the header. CSS does the colour change and the logo crossfade
 * (.nav_logo-full fades out, .nav_logo-abbr fades in under .is-solid).
 * Could be replaced by a Webflow page-scroll interaction only if it can keep the
 * is-menu-open override; the script is the safer option.
 */
(function(){
  var h=document.getElementById('siteHeader');
  if(!h)return;
  var at=parseFloat(h.getAttribute('data-solid-at'))||0.6,t=false;
  function set(){t=false;h.classList.toggle('is-solid',scrollY>innerHeight*at||h.classList.contains('is-menu-open'))}
  addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(set)}},{passive:true});
  addEventListener('resize',set);
  new MutationObserver(set).observe(h,{attributes:true,attributeFilter:['class']});
  set();
})();
