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
  

  bespoke.plugins.bullets = function(deck) {
    var activeSlideIndex,
      activeBulletIndex,

      bullets = deck.slides.map(function(slide) {
        return [].slice.call(slide.querySelectorAll('[data-bespoke-bullet]'), 0);
      }),

      activateBullet = function(slideIndex, bulletIndex) {
        activeSlideIndex = slideIndex;
        activeBulletIndex = bulletIndex;

        bullets.forEach(function(slide, s) {
          slide.forEach(function(bullet, b) {
            bullet.classList.add('bespoke-bullet');

            if (s < slideIndex || s === slideIndex && b <= bulletIndex) {
              bullet.classList.add('bespoke-bullet-active');
              bullet.classList.remove('bespoke-bullet-inactive');
            } else {
              bullet.classList.add('bespoke-bullet-inactive');
              bullet.classList.remove('bespoke-bullet-active');
            }
          });
        });
      },

      canGoForwardsInSlide = function() {
        return bullets[activeSlideIndex][activeBulletIndex + 1] !== undefined;
      },

      canGoBackwardsInSlide = function() {
        return bullets[activeSlideIndex][activeBulletIndex - 1] !== undefined;
      },

      next = function() {
        var nextSlideIndex = activeSlideIndex + 1;

        if (canGoForwardsInSlide()) {
          activateBullet(activeSlideIndex, activeBulletIndex + 1);
          return false;
        } else if (bullets[nextSlideIndex]) {
          activateBullet(nextSlideIndex, 0);
        }
      },

      prev = function() {
        var prevSlideIndex = activeSlideIndex - 1;

        if (canGoBackwardsInSlide()) {
          activateBullet(activeSlideIndex, activeBulletIndex - 1);
          return false;
        } else if (bullets[prevSlideIndex]) {
          activateBullet(prevSlideIndex, bullets[prevSlideIndex].length - 1);
        }
      };

    deck.on('next', function() {
      return next();
    });

    deck.on('prev', function() {
      return prev();
    });

    deck.on('slide', function(e) {
      activateBullet(e.index, 0);
    });

    activateBullet(0, 0);
  };


}(bespoke));