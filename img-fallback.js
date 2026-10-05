/*! ONOC img-fallback v1.0.1  (extra: broken image handling)
 * PLACEMENT: before </body>. Best loaded early so it sees early errors.
 * HOOKS: any <img> with meaningful alt text. If it fails to load it is replaced by
 * <span class="img-fb">alt text</span> (suffixes " emblem", " National Olympic Committee logo"
 * and the prefix "Flag of " are trimmed). Images with .member_flag, or no alt, are hidden.
 * Images still waiting on data-src (lazy Spotlight slides) are ignored.
 */
(function(){
  document.addEventListener('error',function(e){
    var i=e.target;
    if(!i||i.tagName!=='IMG'||i.dataset.src||i.dataset.fb)return;
    i.dataset.fb='1';
    // empty CMS image (Webflow marks it w-dyn-bind-empty or leaves no src): remove it, no label
    if(i.classList.contains('w-dyn-bind-empty')||!i.getAttribute('src')){i.style.display='none';return}
    var a=(i.getAttribute('alt')||'').replace(/ (Paralympic )?emblem$| National Olympic Committee logo$|^Flag of /,'');
    if(!a||i.classList.contains('member_flag')){i.style.visibility='hidden';return}
    var s=document.createElement('span');s.className='img-fb';s.textContent=a;i.replaceWith(s);
  },true);
})();
