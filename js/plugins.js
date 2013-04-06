/**
 * Bespoke Custom Plugins
 */
(function(bespoke) {

  bespoke.plugins.center = function(deck) {
    deck.slides.forEach(function(slide) {
      var centerWrapper = document.createElement('div'),
        children = [].slice.call(slide.childNodes, 0);

      centerWrapper.className = 'bespoke-center-wrapper';
  
      children.forEach(function(child) {
        slide.removeChild(child);
        centerWrapper.appendChild(child);
      });
  
      slide.appendChild(centerWrapper);
      centerWrapper.style.marginTop = ((slide.offsetHeight - centerWrapper.offsetHeight) / 2) + 'px';
    });
  };
  
  bespoke.plugins.progress = function(deck) {
    var progressBar = document.createElement('span'),
      progressWrapper = document.createElement('div');
  
    progressWrapper.className = 'bespoke-progress';
    progressWrapper.appendChild(progressBar);
    deck.parent.appendChild(progressWrapper);
  
    deck.on('activate', function(e) {
      progressBar.style.width = ((e.index * 100) / (deck.slides.length - 1)) + '%';
    });
  };

  bespoke.plugins.hash = function(deck) {
    var parseHash = function() {
        var hash, slideNumberOrName;
        (hash = window.location.hash.slice(1)) &&
          ((slideNumberOrName = parseInt(hash, 0)) &&
            deck.slide(slideNumberOrName - 1)) ||
          deck.slides.forEach(function(slide, i) {
            if (slide.getAttribute('data-bespoke-hash') === hash) {
              deck.slide(i);
            }
          });
      };

    deck.on('activate', function(e) {
      var slideName = e.slide.getAttribute('data-bespoke-hash');
      window.location.hash = slideName || e.index + 1;
    });

    window.addEventListener('hashchange', parseHash);

    parseHash();
  };


}(bespoke));