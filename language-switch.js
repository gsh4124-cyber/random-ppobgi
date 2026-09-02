(() => {
  const langs={ko:'한국어',en:'English',ja:'日本語',es:'Español',zh:'中文',fr:'Français',de:'Deutsch',pt:'Português',id:'Bahasa Indonesia',hi:'हिन्दी',pl:'Polski',it:'Italiano',nl:'Nederlands',tr:'Türkçe',vi:'Tiếng Việt',th:'ไทย',ar:'العربية'};
  const aria={ko:'언어 선택',en:'Language',ja:'言語を選択',es:'Idioma',zh:'选择语言',fr:'Langue',de:'Sprache',pt:'Idioma',id:'Pilih bahasa',hi:'भाषा चुनें',pl:'Wybierz język',it:'Lingua',nl:'Taal kiezen',tr:'Dil seç',vi:'Chọn ngôn ngữ',th:'เลือกภาษา',ar:'اختيار اللغة'};
  const current=window.__RANDOM_PICKER_LANG__||location.pathname.split('/').filter(Boolean)[0]||'ko';
  function cleanup(){
    document.querySelectorAll('#fullLanguageBox,#finalLanguageSwitch,#globalLanguageSwitch,.global-language-box,.language-switch').forEach(el=>{if(el.id!=='languageSwitch')el.remove()});
    document.querySelectorAll('select').forEach(s=>{if(s.id==='languageSelect')return;const vals=[...s.options].map(o=>o.value);if(vals.includes('ko')&&vals.includes('en')&&vals.length>=5){const p=s.closest('#fullLanguageBox,#finalLanguageSwitch,#globalLanguageSwitch,.global-language-box,.language-switch');if(p)p.remove();else s.remove();}});
  }
  function mount(){
    cleanup();if(document.getElementById('languageSwitch'))return;
    const host=document.querySelector('.header-actions')||document.querySelector('header');if(!host)return;
    if(!document.getElementById('languageSwitchStyle')){const st=document.createElement('style');st.id='languageSwitchStyle';st.textContent='.header-actions{flex-wrap:wrap;justify-content:flex-end}.language-switch-one{display:inline-flex;align-items:center;gap:4px;min-height:42px;padding:0 8px;border:1px solid var(--line,#e4ddd1);border-radius:12px;background:rgba(255,253,248,.92);color:var(--text,#1f1c18);white-space:nowrap}.language-switch-one .globe{font-size:15px;line-height:1}.language-switch-one select{max-width:132px;border:0;outline:0;background:transparent;color:inherit;font:inherit;font-size:12px;font-weight:850;cursor:pointer;padding:4px 2px}@media(max-width:500px){header{align-items:flex-start!important}.header-actions{max-width:72%;gap:2px!important}.language-switch-one{min-height:38px;padding:0 6px}.language-switch-one select{max-width:105px;font-size:11px}.reset{min-width:auto!important;padding-left:6px!important;padding-right:6px!important}}';document.head.append(st);}
    const label=aria[current]||aria.en;
    const box=document.createElement('label');box.id='languageSwitch';box.className='language-switch-one';box.setAttribute('aria-label',label);
    const globe=document.createElement('span');globe.className='globe';globe.setAttribute('aria-hidden','true');globe.textContent='🌐';
    const select=document.createElement('select');select.id='languageSelect';select.setAttribute('aria-label',label);select.setAttribute('title',label);
    Object.entries(langs).forEach(([code,text])=>{const o=document.createElement('option');o.value=code;o.textContent=text;select.append(o)});
    select.value=langs[current]?current:'ko';select.addEventListener('change',()=>{const code=select.value;location.href=code==='ko'?'/':`/${code}/`;});
    box.append(globe,select);host.append(box);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
  setTimeout(mount,200);
})();
