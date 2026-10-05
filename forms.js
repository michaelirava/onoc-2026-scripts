/*! ONOC forms v1.0.0
 * PLACEMENT: before </body>.
 * HOOKS: any <form data-onoc-form> (newsletter, search, nav search). The form needs:
 *   - one <input> (required, correct type, e.g. type=email) with aria-describedby="<id>"
 *     pointing at a status element: <p class="form-msg" id="..." role="status" aria-live="polite">
 *     (in Webflow keep that element OUTSIDE the .w-form wrapper's success/fail blocks, or it
 *     will be hidden with the form).
 *   - data-bad="message shown when empty/invalid"      (required)
 *   - data-ok="message shown when valid"               (optional)
 *   - data-demo  (optional) cancel the real submit. Test harness only; leave off in production.
 * Invalid: aria-invalid on the input, class "form-msg err", message set, focus returns to the input.
 * Valid:   aria-invalid removed, class "form-msg ok". Without data-demo the submit continues,
 *          so Webflow's native form handling or a GET search action still works.
 * Typing clears the message. Invalid submits are stopped before Webflow's handler (capture phase).
 */
(function(){
  [].forEach.call(document.querySelectorAll('form[data-onoc-form]'),function(f){
    var i=f.querySelector('input');
    if(!i)return;
    var m=document.getElementById(i.getAttribute('aria-describedby'))||f.parentNode.querySelector('.form-msg');
    if(!m)return;
    function say(t,c){m.textContent=t;m.className='form-msg'+(c?' '+c:'')}
    f.addEventListener('submit',function(e){
      if(!i.value.trim()||!i.checkValidity()){
        e.preventDefault();e.stopImmediatePropagation();
        i.setAttribute('aria-invalid','true');say(f.getAttribute('data-bad')||'Check this field.','err');i.focus();return;
      }
      i.removeAttribute('aria-invalid');
      if(f.hasAttribute('data-demo'))e.preventDefault();
      say(f.getAttribute('data-ok')||'','ok');
    },true);
    i.addEventListener('input',function(){i.removeAttribute('aria-invalid');say('')});
  });
})();
