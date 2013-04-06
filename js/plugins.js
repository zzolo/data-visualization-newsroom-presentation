/**
 * Bespoke Custom Plugins
 */
(function() {

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

}());