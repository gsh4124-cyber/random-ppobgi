(() => {
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
