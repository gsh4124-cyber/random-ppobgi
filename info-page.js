(() => {
  const lang=window.__RANDOM_PICKER_LANG__||location.pathname.split('/').filter(Boolean)[0]||'en';
  const page=document.body?.dataset?.page||location.pathname.split('/').filter(Boolean)[1]||'about';
  const mainPack=window.RandomPickerLocales?.[lang];const data=window.RandomPickerInfoLocales?.[lang]?.[page];
  if(!mainPack||!data)return;
  document.documentElement.lang=mainPack.htmlLang||lang;document.documentElement.dir=mainPack.dir||'ltr';
  document.title=`${data.title} | ${mainPack.brand}`;
  const desc=document.querySelector('meta[name="description"]');if(desc)desc.content=data.description;
  const main=document.querySelector('main');if(!main)return;
  const navItems=[['about',mainPack.footer.about],['guide',mainPack.footer.guide],['privacy',mainPack.footer.privacy],['terms',mainPack.footer.terms],['contact',mainPack.footer.contact]].filter(([p])=>p!==page);
  const back=lang==='ja'?'← ランダム抽選に戻る':lang==='zh'?'← 返回随机抽选':lang==='es'?'← Volver al selector':lang==='pt'?'← Voltar ao sorteador':lang==='ar'?'← العودة إلى الاختيار العشوائي':lang==='fr'?'← Retour au sélecteur':lang==='de'?'← Zurück zur Zufallsauswahl':lang==='id'?'← Kembali ke pemilih':lang==='hi'?'← रैंडम पिकर पर लौटें':lang==='pl'?'← Wróć do losowania':lang==='it'?'← Torna al selettore':lang==='nl'?'← Terug naar de kiezer':lang==='tr'?'← Seçiciye dön':lang==='vi'?'← Quay lại bộ chọn':lang==='th'?'← กลับไปสุ่มเลือก':'← Back to Random Picker';
  main.innerHTML=`<a class="home" href="/${lang}/">${back}</a><article><p class="eyebrow">${page.toUpperCase()}</p><h1>${esc(data.title)}</h1>${data.html}</article><nav>${navItems.map(([p,l])=>`<a href="/${lang}/${p}/">${esc(l)}</a>`).join('')}</nav>`;
  function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
})();
