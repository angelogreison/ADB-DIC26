/* Guías del blog: una sola fuente (assets/guias.json). Se muestran en cada elemento con data-guias. */
(function () {
  var s = document.currentScript;
  var base = s ? s.src.replace(/assets\/js\/guias\.js.*$/, '') : '/';
  function esc(x) { return String(x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function card(g) {
    return '<article class="blog-card"><div class="blog-image"><img src="' + base + esc(g.img) + '" alt="' + esc(g.alt) + '" width="' + g.w + '" height="' + g.h + '" loading="lazy" decoding="async"></div>' +
      '<div class="blog-content"><span class="bh-cat">' + esc(g.cat) + '</span><h3 class="bh-title">' + esc(g.title) + '</h3><p>' + esc(g.excerpt) + '</p></div>' +
      '<div class="bh-more"><a class="interlink" href="' + base + esc(g.href) + '">Leer la guía</a></div></article>';
  }
  fetch(base + 'assets/guias.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (list) {
    document.querySelectorAll('[data-guias]').forEach(function (el) {
      var n = parseInt(el.getAttribute('data-guias'), 10);
      var items = n > 0 ? list.slice(0, n) : list;
      el.innerHTML = items.map(card).join('');
    });
  }).catch(function () { /* sin guías si no carga el archivo */ });
})();