/* Tarjetas de servicios: una sola fuente (assets/servicios.json). Se muestran en cada elemento con data-servicios. */
(function () {
  var s = document.currentScript;
  var base = s ? s.src.replace(/assets\/js\/servicios\.js.*$/, '') : '/';
  fetch(base + 'assets/servicios.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (list) {
    document.querySelectorAll('[data-servicios]').forEach(function (el) {
      var n = parseInt(el.getAttribute('data-servicios'), 10);
      var items = n > 0 ? list.slice(0, n) : list;
      el.innerHTML = items.map(function (x) { return x.html.split('%BASE%').join(base); }).join('');
    });
  }).catch(function () { /* sin tarjetas si no carga el archivo */ });
})();