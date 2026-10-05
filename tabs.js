/*! ONOC tabs v1.0.0  (extra: used by Latest updates and Members)
 * PLACEMENT: before </body>.
 * HOOKS: [role=tablist] containing [role=tab] buttons, each with aria-controls="<panel id>"
 *        and a [role=tabpanel] with that id. First tab has aria-selected=true.
 * Click selects. Arrow Left/Right, Home and End move focus and select. Roving tabindex.
 * Inactive panels get the hidden attribute.
 */
(function(){
  [].forEach.call(document.querySelectorAll('[role=tablist]'),function(list){
    var ts=[].slice.call(list.querySelectorAll('[role=tab]'));
    if(!ts.length)return;
    function sel(t){ts.forEach(function(x){
      var on=x===t,p=document.getElementById(x.getAttribute('aria-controls'));
      x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1;if(p)p.hidden=!on})}
    ts.forEach(function(t,n){
      t.addEventListener('click',function(){sel(t)});
      t.addEventListener('keydown',function(e){
        var k=null;
        if(e.key==='ArrowRight')k=(n+1)%ts.length;
        if(e.key==='ArrowLeft')k=(n-1+ts.length)%ts.length;
        if(e.key==='Home')k=0;
        if(e.key==='End')k=ts.length-1;
        if(k!==null){e.preventDefault();ts[k].focus();sel(ts[k])}
      });
    });
  });
})();
