/*! ONOC theme-init v1.0.0
 * PLACEMENT: <head>, first script, synchronous (no defer/async). Runs before paint.
 * HOOKS: none required. Writes to <html>:
 *   class "js"            gates the [data-reveal] styles (so no-JS visitors still see content)
 *   data-theme="dark|light"  restored from localStorage key "theme"
 * The CSS must key dark mode off  :root[data-theme=dark]  (ONOC Theme variable mode).
 */
(function(){
  var d=document.documentElement;
  d.classList.add('js');
  try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')d.dataset.theme=t}catch(e){}
})();
