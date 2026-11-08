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
    show([paragraph(t('Este espaço está preparado para receber o ficheiro real. Este documento não está disponível neste momento.', 'This space is ready for the actual file. This document is currently unavailable.'))], label);
  }
  dialog?.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => { if (e.target === dialog) {
    const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  }});
  dialog?.addEventListener('close', () => { content?.querySelectorAll('video').forEach(v => v.pause()); document.body.classList.remove('modal-open'); opener?.focus(); });
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
    } else el.addEventListener('click', () => show([paragraph(t('Este contacto não está disponível neste momento.', 'This contact is currently unavailable.'))], el.textContent.trim()));
  });
  if (config.portrait) document.querySelectorAll('.identity-art').forEach(el => {
    const img = document.createElement('img'); img.src = path(config.portrait); img.alt = t('Fotografia de Diogo Pinto', 'Photograph of Diogo Pinto'); img.className = 'portrait';
    el.prepend(img); el.classList.add('has-portrait');
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
        const isVideo = photo.type === 'video' || /\.(?:mp4|webm|ogv)(?:[?#].*)?$/i.test(photo.path || '');
        if (isVideo) {
          b.setAttribute('aria-label', t('Reproduzir: ', 'Play: ') + caption);
          const preview = document.createElement('div'); preview.className = 'video-thumb';
          if (photo.poster) {
            const poster = document.createElement('img'); poster.src = path(photo.poster); poster.alt = ''; poster.loading = 'lazy'; poster.decoding = 'async';
            preview.append(poster);
          }
          const play = document.createElement('span'); play.className = 'video-play'; play.textContent = '▶'; play.setAttribute('aria-hidden','true');
          preview.append(play); b.append(preview);
        } else {
          const media = document.createElement('span'); media.className = 'gallery-photo';
          media.style.setProperty('--media-photo', `url("${path(photo.path)}")`);
          const img = document.createElement('img'); img.src = path(photo.path); img.alt = caption; img.loading = 'lazy'; img.decoding = 'async';
          media.append(img); b.append(media);
        }
        const label = document.createElement('span'); label.textContent = caption;
        b.append(label); g.append(b);
      });
    } else if (config.showPlaceholders === false && !g.hasAttribute('data-visible-empty')) { g.hidden = true; if (g.nextElementSibling?.classList.contains('gallery-hint')) g.nextElementSibling.hidden = true; return; }
    galleries.set(g, photos);
    g.addEventListener('click', e => {
      const target = e.target.closest('.gallery-item'); if (!target) return;
      const items = [...g.querySelectorAll('.gallery-item')];
      let i = items.indexOf(target);
      function render() {
        content.querySelectorAll('video').forEach(v => v.pause());
        const stage = document.createElement('div'); stage.className = 'photo-stage';
        const title = items[i].textContent.trim();
        if (photos.length) {
          const photo = photos[i];
          const isVideo = photo.type === 'video' || /\.(?:mp4|webm|ogv)(?:[?#].*)?$/i.test(photo.path || '');
          if (isVideo) {
            const video = document.createElement('video'); video.src = path(photo.path); video.controls = true;
            video.preload = 'metadata'; video.playsInline = true; video.setAttribute('aria-label', title);
            if (photo.poster) video.poster = path(photo.poster);
            stage.append(video);
          } else {
            const img = document.createElement('img'); img.src = path(photo.path); img.alt = title; stage.append(img);
          }
        } else {
          stage.classList.add('photo-placeholder');
          stage.append(paragraph(t('Fotografia indisponível.', 'Photograph unavailable.')));
          stage.append(paragraph(t('Fotografia não disponível', 'Photograph unavailable')));
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

  // Chapter 01: six photographs; manual carousel with keyboard and touch controls.
  document.querySelectorAll('[data-chapter-carousel]').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('.chapter-carousel-slide')];
    const dots = [...carousel.querySelectorAll('.chapter-carousel-dot')];
    const counter = carousel.querySelector('.chapter-carousel-count');
    let current = 0, x0 = null;
    function go(index) {
      if (!slides.length) return;
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      dots.forEach((dot, i) => { dot.classList.toggle('is-active', i === current); dot.setAttribute('aria-current', String(i === current)); });
      if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
    }
    carousel.querySelector('.chapter-carousel-prev')?.addEventListener('click', () => go(current - 1));
    carousel.querySelector('.chapter-carousel-next')?.addEventListener('click', () => go(current + 1));
    dots.forEach((dot,i) => dot.addEventListener('click', () => go(i)));
    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); go(current - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); go(current + 1); }
    });
    carousel.addEventListener('touchstart', e => { x0 = e.changedTouches[0]?.screenX ?? null; }, {passive:true});
    carousel.addEventListener('touchend', e => {
      if (x0 === null) return;
      const delta = (e.changedTouches[0]?.screenX ?? x0) - x0;
      if (Math.abs(delta) > 45) go(current + (delta < 0 ? 1 : -1));
      x0 = null;
    }, {passive:true});
  });

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
