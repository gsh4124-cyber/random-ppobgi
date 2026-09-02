(() => {
  const LANGS = [
    ['ko','한국어','/'],['en','English','/en/'],['ja','日本語','/ja/'],['es','Español','/es/'],['zh','中文','/zh/'],['fr','Français','/fr/'],['de','Deutsch','/de/'],['pt','Português','/pt/'],['id','Bahasa Indonesia','/id/'],['hi','हिन्दी','/hi/'],['pl','Polski','/pl/'],['it','Italiano','/it/'],['nl','Nederlands','/nl/'],['tr','Türkçe','/tr/'],['vi','Tiếng Việt','/vi/'],['th','ไทย','/th/'],['ar','العربية','/ar/']
  ];
  const current = location.pathname.split('/').filter(Boolean)[0] || 'ko';
  const select = document.createElement('select');
  select.setAttribute('aria-label','Language');
  select.style.cssText='position:fixed;top:14px;right:14px;z-index:20;padding:8px 10px;border:1px solid #d8d0c3;border-radius:10px;background:#fffdf8;color:#211d18;font:inherit;max-width:180px';
  LANGS.forEach(([code,label,path])=>{ const o=document.createElement('option'); o.value=path; o.textContent=label; if(code===current)o.selected=true; select.append(o); });
  select.addEventListener('change',()=>{ location.href=select.value; });
  document.body.append(select);

  function randomInt(min, max) {
    min = Math.ceil(min); max = Math.floor(max);
    if (!Number.isFinite(min) || !Number.isFinite(max) || max < min) return null;
    const range = max - min + 1;
    if (range <= 0 || range > 0x100000000) return null;
    const limit = Math.floor(0x100000000 / range) * range;
    const buf = new Uint32Array(1);
    let value;
    do { crypto.getRandomValues(buf); value = buf[0]; } while (value >= limit);
    return min + (value % range);
  }
  const listInput = document.querySelector('#globalList');
  const listButton = document.querySelector('#globalPickList');
  const listResult = document.querySelector('#globalListResult');
  listButton?.addEventListener('click', () => {
    const items = (listInput?.value || '').split(/\r?\n|,/).map(v => v.trim()).filter(Boolean);
    if (!items.length) { listResult.textContent = document.body.dataset.emptyMessage || 'Add at least one item.'; return; }
    listResult.textContent = items[randomInt(0, items.length - 1)];
  });
  const minInput = document.querySelector('#globalMin');
  const maxInput = document.querySelector('#globalMax');
  const numberButton = document.querySelector('#globalPickNumber');
  const numberResult = document.querySelector('#globalNumberResult');
  numberButton?.addEventListener('click', () => {
    const value = randomInt(Number(minInput?.value), Number(maxInput?.value));
    numberResult.textContent = value === null ? (document.body.dataset.rangeMessage || 'Check the range.') : String(value);
  });
})();