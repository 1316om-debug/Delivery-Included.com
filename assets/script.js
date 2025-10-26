// Basic interactions: menu toggle, year fill, contact form UI
document.addEventListener('DOMContentLoaded', function(){
  // year placeholders
  const y = new Date().getFullYear();
  ['year','year2','year3','year4'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });

  // menu toggle for mobile
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', ()=> nav.classList.toggle('show'));
  }

  // contact form feedback (works with Formspree)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      const status = document.getElementById('formStatus');
      status.textContent = 'Sending…';
      const action = form.getAttribute('action') || '';
      // If action still uses formspree placeholder, fallback to mailto (client-side)
      if(action.includes('formspree.io/f/yourformid') || action.trim() === ''){
        status.textContent = 'Form not configured. Please replace the form "action" with your Formspree endpoint (see contact page instructions).';
        return;
      }
      try {
        const data = new FormData(form);
        const res = await fetch(action, {
          method: form.method || 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });
        if(res.ok){
          form.reset();
          status.textContent = 'Message sent — thank you! We will reply shortly.';
        } else {
          const json = await res.json().catch(()=>null);
          status.textContent = (json && json.error) ? json.error : 'Error sending message. Try again later.';
        }
      } catch(err){
        status.textContent = 'Network error. Try again later.';
      }
    });
  }
});

// simple fake checkout hook (replace with real checkout)
function openCheckout(title, price){
  alert('Demo checkout — ' + title + ' — $' + price + '\n\nWhen ready, link a payment provider (Stripe/PayPal) or use supplier checkout links.');
}
