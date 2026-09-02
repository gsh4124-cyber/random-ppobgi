(() => {
  const lang = location.pathname.split('/').filter(Boolean)[0] || 'ko';
  fetch('/index.html', { cache: 'no-store' })
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.text();
    })
    .then(html => {
      const canonical = `https://random-ppobgi.pages.dev/${lang === 'ko' ? '' : lang + '/'}`;
      html = html
        .replace('<head>', `<head><base href="/">`)
        .replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}">`)
        .replace('</body>', `<script>window.__RANDOM_PICKER_LANG__=${JSON.stringify(lang)};<\/script><script src="/full-i18n-safe.js"><\/script></body>`);
      document.open();
      document.write(html);
      document.close();
    })
    .catch(err => {
      console.error(err);
      document.body.innerHTML = '<main style="font-family:system-ui;padding:32px"><h1>Random Picker</h1><p>Loading failed. <a href="/">Open the main version</a></p></main>';
    });
})();
