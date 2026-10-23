(() => {
  'use strict';
  const config = window.PORTFOLIO || {};
  const en = document.documentElement.lang.startsWith('en');
  const root = new URL('../../', document.querySelector('script[data-main]').src);
  const t = (pt, english) => en ? english : pt;
  const path = p => new URL(p, root).href;
  const menu = document.querySelector('.nav-links');
  const toggle = document.querySelector('.menu-toggle');
  function closeMenu() { toggle?.setAttribute('aria-expanded', 'false'); menu?.classList.remove('open'); }
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); menu.classList.toggle('open', open);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
  menu?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.querySelectorAll('[data-language]').forEach(a => {
    a.addEventListener('click', () => { const url = new URL(a.href); url.hash = location.hash; a.href = url.href; });
  });

  const dialog = document.querySelector('#viewer');
  const content = dialog?.querySelector('.viewer-content');
  let opener;
  function show(nodes, title) {
    if (!dialog) return;
    opener = document.activeElement;
    content.replaceChildren(...nodes);
    dialog.querySelector('#viewer-title').textContent = title;
    dialog.showModal(); document.body.classList.add('modal-open');
  }
  function paragraph(value) { const p = document.createElement('p'); p.textContent = value; return p; }
  function unavailable(label) {
    show([paragraph(t('Este espaço está preparado para receber o ficheiro real. O documento ainda não foi adicionado a esta versão de trabalho.', 'This space is ready for the actual file. The document has not yet been added to this working version.'))], label);
  }
  dialog?.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => { if (e.target === dialog) {
    const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  }});
  dialog?.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus(); });
  document.querySelectorAll('[data-cv], [data-document]').forEach(el => {
    const source = el.hasAttribute('data-cv') ? config.cv?.[en ? 'en' : 'pt'] : config.documents?.[el.dataset.document];
    if (source) {
      const a = document.createElement('a'); a.className = el.className; a.innerHTML = el.innerHTML;
      a.href = path(source);
      if (el.hasAttribute('data-cv')) a.setAttribute('download', source.split('/').pop().split(/[?#]/)[0]);
      else { a.target = '_blank'; a.rel = 'noopener'; }
      el.replaceWith(a);
    } else el.addEventListener('click', () => unavailable(el.textContent.trim()));
  });
  document.querySelectorAll('[data-contact]').forEach(el => {
    const value = config[el.dataset.contact];
    if (value) {
      const a = document.createElement('a'); a.className = el.className; a.innerHTML = el.innerHTML;
      a.href = el.dataset.contact === 'email' ? `mailto:${value}` : value;
      if (el.dataset.contact !== 'email') { a.target = '_blank'; a.rel = 'noopener'; }
      el.replaceWith(a);
    } else el.addEventListener('click', () => show([paragraph(t('O contacto será adicionado quando o conteúdo final estiver confirmado.', 'Contact details will be added once the final content is confirmed.'))], el.textContent.trim()));
  });
  if (config.portrait) document.querySelectorAll('.identity-art').forEach(el => {
    const img = document.createElement('img'); img.src = path(config.portrait); img.alt = 'Diogo Pinto'; img.className = 'portrait'; el.replaceChildren(img);
  });

  const galleries = new Map();
  document.querySelectorAll('[data-gallery]').forEach(g => {
    const key = g.dataset.gallery;
    const photos = config.galleries?.[key] || [];
    if (photos.length) {
      g.replaceChildren();
      photos.forEach((photo, i) => {
        const b = document.createElement('button'); b.className = 'gallery-item'; b.type = 'button';
        b.dataset.photoIndex = i;
        const caption = photo[en ? 'en' : 'pt'] || photo.pt || photo.en || '';
        b.setAttribute('aria-label', t('Ampliar: ', 'Enlarge: ') + caption);
        const img = document.createElement('img'); img.src = path(photo.path); img.alt = caption; img.loading = 'lazy'; img.decoding = 'async';
        const label = document.createElement('span'); label.textContent = caption;
        b.append(img, label); g.append(b);
      });
    } else if (config.showPlaceholders === false) { g.hidden = true; if (g.nextElementSibling?.classList.contains('gallery-hint')) g.nextElementSibling.hidden = true; return; }
    galleries.set(g, photos);
    g.addEventListener('click', e => {
      const target = e.target.closest('.gallery-item'); if (!target) return;
      const items = [...g.querySelectorAll('.gallery-item')];
      let i = items.indexOf(target);
      function render() {
        const stage = document.createElement('div'); stage.className = 'photo-stage';
        const title = items[i].textContent.trim();
        if (photos.length) {
          const img = document.createElement('img'); img.src = path(photos[i].path); img.alt = title; stage.append(img);
        } else {
          stage.classList.add('photo-placeholder');
          stage.append(paragraph(t('A tua fotografia entra aqui.', 'Your photograph goes here.')));
          stage.append(paragraph(t('Pré-visualização da galeria · imagem ainda não adicionada', 'Gallery preview · image not added yet')));
        }
        const controls = document.createElement('div'); controls.className = 'gallery-controls';
        const prev = document.createElement('button'); prev.type = 'button'; prev.textContent = t('← Anterior', '← Previous');
        const next = document.createElement('button'); next.type = 'button'; next.textContent = t('Seguinte →', 'Next →');
        const counter = document.createElement('span'); counter.textContent = `${i + 1} / ${items.length}`;
        prev.addEventListener('click', () => { i = (i - 1 + items.length) % items.length; render(); });
        next.addEventListener('click', () => { i = (i + 1) % items.length; render(); });
        controls.append(prev, counter, next);
        content.replaceChildren(stage, paragraph(title), controls);
        dialog.querySelector('#viewer-title').textContent = t('Galeria', 'Gallery');
      }
      show([], t('Galeria', 'Gallery')); render();
    });
  });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
