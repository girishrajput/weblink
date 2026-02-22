/**
 * Homepage banner typing animation and carousel
 * Load after jQuery; runs on DOMContentLoaded when .carousel-item exists
 */
(function () {
  'use strict';

  function init() {
    var banners = document.querySelectorAll('.bannerSec .carousel-item');
    var indicators = document.querySelectorAll('.bannerSec .carousel-indicators li');
    if (!banners.length || !indicators.length) return;

    var currentBanner = 0;
    var lines = [];
    var currentLine = 0;
    var charIndex = 0;
    var typingTimeout = null;

    function htmlToChars(html) {
      var chars = [];
      var i = 0;
      while (i < html.length) {
        if (html[i] === '<') {
          var tag = '';
          while (i < html.length && html[i] !== '>') tag += html[i++];
          tag += '>';
          i++;
          chars.push(tag);
        } else {
          chars.push(html[i++]);
        }
      }
      return chars;
    }

    function showBanner(index) {
      banners.forEach(function (b, i) {
        b.classList.toggle('active', i === index);
      });
      indicators.forEach(function (ind, i) {
        ind.classList.toggle('active', i === index);
      });
    }

    function startTyping() {
      var banner = banners[currentBanner];
      var titleEl = banner.querySelector('._title');
      var listItems = banner.querySelectorAll('ul li');
      lines = titleEl ? [titleEl].concat([].slice.call(listItems)) : [].slice.call(listItems);
      currentLine = 0;
      charIndex = 0;
      lines.forEach(function (line) { line.innerHTML = ''; });
      clearTimeout(typingTimeout);
      typeLine();
    }

    function typeLine() {
      var line = lines[currentLine];
      if (!line || !line.dataset.line) {
        currentLine++;
        if (currentLine < lines.length) setTimeout(typeLine, 200);
        return;
      }
      var html = line.dataset.line;
      var chars = htmlToChars(html);

      lines.forEach(function (l) { l.classList.remove('cursor'); });
      line.classList.add('cursor');

      if (charIndex < chars.length) {
        charIndex++;
        line.innerHTML = chars.slice(0, charIndex).join('');
        typingTimeout = setTimeout(typeLine, 50);
      } else {
        line.classList.remove('cursor');
        currentLine++;
        charIndex = 0;
        if (currentLine < lines.length) {
          typingTimeout = setTimeout(typeLine, 200);
        } else {
          typingTimeout = setTimeout(function () {
            currentBanner = (currentBanner + 1) % banners.length;
            showBanner(currentBanner);
            startTyping();
          }, 1500);
        }
      }
    }

    indicators.forEach(function (ind, i) {
      ind.addEventListener('click', function () {
        if (i !== currentBanner) {
          currentBanner = i;
          showBanner(currentBanner);
          startTyping();
        }
      });
    });

    document.addEventListener('click', function (e) {
      var title = e.target.closest('._title');
      if (!title) return;
      var url = title.dataset.url;
      if (url) window.location.href = url;
    });

    showBanner(currentBanner);
    startTyping();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
