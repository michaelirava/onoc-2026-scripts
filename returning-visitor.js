/*! ONOC returning-visitor v1.0.0
 * PLACEMENT: before </body>, deferred is fine. Site-wide (it also records the pages visited).
 * HOOKS: #backlinks  empty container inside the hero's "Pick up where you left off" row (.hero_back,
 *        hidden by CSS until html.returning). The HTML is identical for everyone; this only adds
 *        the class and the links client-side.
 * CONSENT: does nothing unless localStorage "onoc_consent" === "1" (set by the cookie banner when the
 *        visitor accepts functional storage). Storage keys: onoc_seen ("1" after a first consented
 *        visit), onoc_recent (JSON [[title, href], ...], newest first, max 3, written on each consented
 *        page view except the home page). First consented visit only sets onoc_seen.
 * Returning visit = consent + seen: adds class "returning" to <html> and fills #backlinks with links.
 * Only same-site or relative hrefs are rendered.
 * TEST: on localhost or *.webflow.io, ?returning=1 seeds consent + sample links, ?returning=0 clears seen.
 */
(function(){
  try{
    var r=document.documentElement,L=localStorage,
        dev=/^(localhost|127\.0\.0\.1|.*\.webflow\.io)$/.test(location.hostname),
        q=new URLSearchParams(location.search).get('returning');
    if(dev&&q==='1'){
      L.setItem('onoc_consent','1');L.setItem('onoc_seen','1');
      L.setItem('onoc_recent',JSON.stringify([['Olympic Solidarity','#'],['Strategic Plan','#strategy'],['Media kit','#']]));
    }
    if(dev&&q==='0')L.removeItem('onoc_seen');
    if(L.getItem('onoc_consent')!=='1')return;
    var list=JSON.parse(L.getItem('onoc_recent')||'[]');
    if(L.getItem('onoc_seen')==='1'){
      var box=document.getElementById('backlinks');
      if(box){
        r.classList.add('returning');
        list.forEach(function(p){
          if(!/^(#|\/|\.)/.test(p[1])&&p[1].indexOf(location.origin)!==0)return;
          var a=document.createElement('a');a.href=p[1];a.textContent=p[0];box.appendChild(a);
        });
      }
    }else L.setItem('onoc_seen','1');
    if(location.pathname!=='/'&&document.title){
      var t=document.title.replace(/\s*[|–-]\s*ONOC.*$/,''),h=location.pathname;
      list=list.filter(function(p){return p[1]!==h});list.unshift([t,h]);
      L.setItem('onoc_recent',JSON.stringify(list.slice(0,3)));
    }
  }catch(e){}
})();
