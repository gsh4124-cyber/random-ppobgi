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
    if(!document.getElementById('languageSwitchStyle')){const st=document.createElement('style');st.id='languageSwitchStyle';st.textContent='.header-actions{display:flex;align-items:center;flex-wrap:nowrap;justify-content:flex-end;gap:4px;margin-left:auto;min-width:0}.language-switch-one{display:inline-flex;align-items:center;justify-content:center;gap:4px;min-height:42px;padding:0 8px;border:1px solid var(--line,#e4ddd1);border-radius:12px;background:rgba(255,253,248,.92);color:var(--text,#1f1c18);white-space:nowrap}.language-switch-one .globe{font-size:15px;line-height:1;flex:0 0 auto}.language-switch-one select{max-width:132px;border:0;outline:0;background:transparent;color:inherit;font:inherit;font-size:12px;font-weight:850;cursor:pointer;padding:4px 2px}@media(max-width:500px){header{display:flex!important;align-items:center!important;justify-content:space-between!important;flex-wrap:nowrap!important;gap:5px!important}.logo{font-size:16px!important;line-height:1!important;white-space:nowrap!important;flex:0 0 auto!important}.header-actions{display:flex!important;align-items:center!important;flex-wrap:nowrap!important;justify-content:flex-end!important;gap:1px!important;margin-left:auto!important;max-width:none!important;min-width:0!important}.reset,#soundToggle{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:auto!important;height:36px!important;min-height:36px!important;padding:3px 5px!important;line-height:1!important}.reset{font-size:11px!important;white-space:nowrap!important}.language-switch-one{min-height:36px;height:36px;padding:0 5px;border-radius:11px;gap:3px;flex:0 1 auto;min-width:0}.language-switch-one .globe{font-size:14px}.language-switch-one select{max-width:91px;min-width:0;font-size:11px;padding:2px 0}}@media(max-width:370px){.logo{font-size:15px!important}.reset,#soundToggle{padding-left:3px!important;padding-right:3px!important}.language-switch-one{padding-left:4px;padding-right:3px}.language-switch-one select{max-width:78px;font-size:10.5px}}';document.head.append(st);}
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
