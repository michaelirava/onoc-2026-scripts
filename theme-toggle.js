/*! ONOC theme-toggle v1.0.0
 * PLACEMENT: before </body>.
 * HOOKS: button#theme  (aria-pressed is kept in sync: "true" when dark).
 * Persists the choice in localStorage "theme". Needs theme-init.js in the head.
 */
(function(){
  var b=document.getElementById('theme');
  if(!b)return;
  var r=document.documentElement;
  function sync(){b.setAttribute('aria-pressed',String(r.dataset.theme==='dark'))}
  sync();
  b.addEventListener('click',function(){
    var n=r.dataset.theme==='dark'?'light':'dark';
    r.dataset.theme=n;
    try{localStorage.setItem('theme',n)}catch(e){}
    sync();
  });
})();
