/* Tema partilhado pelas páginas PT/EN. Executar no <head>, antes dos estilos. */
(() => {
  'use strict';
  const key = 'diogo-pinto-theme';
  const root = document.documentElement;
  const media = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const valid = value => value === 'light' || value === 'dark';
  let preference = null;
  try {
    const saved = localStorage.getItem(key);
    if (valid(saved)) preference = saved;
  } catch (_) { /* O seletor continua a funcionar se o armazenamento estiver bloqueado. */ }
  // Usado apenas pelo HTML de pré-visualização para manter o tema entre páginas.
  if (valid(window.PORTFOLIO_PREVIEW_THEME)) preference = window.PORTFOLIO_PREVIEW_THEME;

  const automatic = () => media?.matches ? 'dark' : 'light';
  function updateControls() {
    const dark = root.dataset.theme === 'dark';
    const en = root.lang.startsWith('en');
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.hidden = false;
      button.setAttribute('aria-label', en ? 'Dark mode' : 'Modo escuro');
      button.setAttribute('aria-pressed', String(dark));
      button.title = en ? (dark ? 'Switch to light mode' : 'Switch to dark mode')
        : (dark ? 'Ativar modo claro' : 'Ativar modo escuro');
      const label = button.querySelector('[data-theme-label]');
      if (label) label.textContent = en ? (dark ? 'Dark' : 'Light') : (dark ? 'Escuro' : 'Claro');
    });
  }
  function apply(theme) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#0d1524' : '#f6f8fc';
    updateControls();
  }
  function select(theme) {
    preference = theme;
    try { localStorage.setItem(key, theme); } catch (_) { /* Preferência em memória. */ }
    apply(theme);
    window.dispatchEvent(new CustomEvent('portfolio-theme-change', {detail: {theme}}));
  }
  apply(preference || automatic());

  function bindControls() {
    updateControls();
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.addEventListener('click', () => select(root.dataset.theme === 'dark' ? 'light' : 'dark'));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindControls, {once: true});
  else bindControls();
  const systemChanged = () => { if (!preference) apply(automatic()); };
  if (media?.addEventListener) media.addEventListener('change', systemChanged);
  else if (media?.addListener) media.addListener(systemChanged);
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    preference = valid(event.newValue) ? event.newValue : null;
    apply(preference || automatic());
  });
})();
