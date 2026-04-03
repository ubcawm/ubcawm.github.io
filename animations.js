// animations.js
// scroll-triggered reveal for .reveal elements
// waits for the full page (including injected nav/footer) to be ready

document.addEventListener('DOMContentLoaded', function() {

    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
  
    // if the browser doesn't support IntersectionObserver (very old browsers),
    // just make everything visible immediately so nothing stays blank
    if (!window.IntersectionObserver) {
      els.forEach(function(el) { el.classList.add('is-visible'); });
      return;
    }
  
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    // wait one animation frame so the browser has finished laying out
    // the page before we start measuring element positions
    requestAnimationFrame(function() {
      els.forEach(function(el) {
  
        // check if element is already in the viewport on page load
        // (e.g. sections near the top) — reveal those immediately
        var rect = el.getBoundingClientRect();
        var inView = rect.top < window.innerHeight && rect.bottom > 0;
  
        if (inView) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    });
  
  });