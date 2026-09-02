(() => {
  const names={ko:'한국어',en:'English',ja:'日本語',es:'Español',zh:'中文',fr:'Français',de:'Deutsch',pt:'Português',id:'Bahasa Indonesia',hi:'हिन्दी',pl:'Polski',it:'Italiano',nl:'Nederlands',tr:'Türkçe',vi:'Tiếng Việt',th:'ไทย',ar:'العربية'};
  document.querySelectorAll('#globalLanguageSwitch,#finalLanguageSwitch,#fullLanguageBox,#canonicalLanguageSwitch,#fullLanguageSelect,#canonicalLanguageSelect,#globalLanguageSelect,[data-global-language-switch],.global-language-switch,.language-switcher,.language-selector').forEach(el=>{const box=el.closest?.('label,div')||el;box.remove()});
  const header=document.querySelector('header');if(!header)return;
  const box=document.createElement('label');box.id='globalLanguageSwitch';box.setAttribute('aria-label','언어 선택');box.style.cssText='display:flex;align-items:center;gap:6px;margin-left:auto;flex:0 0 auto;white-space:nowrap';
  const globe=document.createElement('span');globe.textContent='🌐';globe.setAttribute('aria-hidden','true');
  const select=document.createElement('select');select.id='globalLanguageSelect';select.style.cssText='width:132px;height:38px;border:1px solid #e4ddd1;border-radius:11px;background:#fffdf8;padding:0 30px 0 10px;font:inherit;font-weight:800;color:#211d18';
  Object.entries(names).forEach(([code,label])=>{const o=document.createElement('option');o.value=code;o.textContent=label;o.selected=code==='ko';select.append(o)});
  select.addEventListener('change',()=>{location.href=select.value==='ko'?'/':`/${select.value}/`});box.append(globe,select);header.append(box);
})();
