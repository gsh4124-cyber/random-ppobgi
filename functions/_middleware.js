export async function onRequest(context) {
  const response = await context.next();
  const url = new URL(context.request.url);
  if (url.pathname !== '/' || !response.headers.get('content-type')?.includes('text/html')) return response;

  const options = [
    ['','한국어'],['en','English'],['ja','日本語'],['es','Español'],['zh','中文'],['fr','Français'],['de','Deutsch'],['pt','Português'],['id','Bahasa Indonesia'],['hi','हिन्दी'],['pl','Polski'],['it','Italiano'],['nl','Nederlands'],['tr','Türkçe'],['vi','Tiếng Việt'],['th','ไทย'],['ar','العربية']
  ];
  const html = `<label style="display:flex;align-items:center;gap:7px;font-size:12px;font-weight:800;color:#7d7468" aria-label="언어 선택"><span>🌐</span><select id="globalLanguageSelect" style="border:1px solid #e4ddd1;background:#fffdf8;color:#1f1c18;border-radius:10px;padding:7px 9px;font:inherit;font-weight:800;max-width:150px">${options.map(([v,l])=>`<option value="${v}"${v===''?' selected':''}>${l}</option>`).join('')}</select></label><script>document.getElementById('globalLanguageSelect')?.addEventListener('change',function(){location.href=this.value?('/'+this.value+'/'):'/';});</script>`;

  return new HTMLRewriter()
    .on('header', { element(el) { el.append(html, { html: true }); } })
    .transform(response);
}
