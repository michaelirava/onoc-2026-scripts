/*! ONOC clocks v1.0.0
 * PLACEMENT: before </body>.
 * HOOKS (all optional, each clock is skipped if its element is missing):
 *   #clkL  time text, Lausanne   #clkLd  date text, Lausanne   (default zone Europe/Zurich)
 *   #clkF  time text, Fiji       #clkFd  date text, Fiji       (default zone Pacific/Fiji)
 * OPTIONAL ATTR: data-tz="<IANA zone>" on #clkL / #clkF overrides the zone.
 * Output: "11:38 am" and "/ SUN Oct 04". Refreshes every 15 s. The wrapper carries the
 * accessible name (role=img + aria-label) and the text nodes are aria-hidden, as in the comp.
 */
(function(){
  var rows=[];
  [['clkL','Europe/Zurich'],['clkF','Pacific/Fiji']].forEach(function(p){
    var t=document.getElementById(p[0]);
    if(!t)return;
    var tz=t.getAttribute('data-tz')||p[1];
    try{rows.push({
      t:t,d:document.getElementById(p[0]+'d'),
      tf:new Intl.DateTimeFormat('en-US',{timeZone:tz,hour:'numeric',minute:'2-digit',hour12:true}),
      df:new Intl.DateTimeFormat('en-US',{timeZone:tz,weekday:'short',month:'short',day:'2-digit'})
    })}catch(e){}
  });
  if(!rows.length)return;
  function tick(){
    var n=new Date();
    rows.forEach(function(r){
      r.t.textContent=r.tf.format(n).replace(/[  \s]/g,' ').toLowerCase();
      if(r.d){var p={};r.df.formatToParts(n).forEach(function(o){p[o.type]=o.value});
        r.d.textContent='/ '+p.weekday.toUpperCase()+' '+p.month+' '+p.day}
    });
  }
  tick();
  setInterval(tick,15000);
})();
