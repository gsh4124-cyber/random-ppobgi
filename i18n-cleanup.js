(() => {
  const lang = window.__RANDOM_PICKER_LANG__ || location.pathname.split('/').filter(Boolean)[0] || 'ko';
  const names = {ko:'한국어',en:'English',ja:'日本語',es:'Español',zh:'中文',fr:'Français',de:'Deutsch',pt:'Português',id:'Bahasa Indonesia',hi:'हिन्दी',pl:'Polski',it:'Italiano',nl:'Nederlands',tr:'Türkçe',vi:'Tiếng Việt',th:'ไทย',ar:'العربية'};
  const core = {
    ko:{logo:'랜덤 뽑기',hero:'오늘은\n어떻게 뽑을까?',picker:'🎯 뽑기 게임',tools:'🎲 게임 도구',method:'뽑기 방식',number:'번호',name:'이름',people:'총 인원',unit:'명'},
    en:{logo:'Random Picker',hero:'How should we\npick today?',picker:'🎯 Picker Games',tools:'🎲 Game Tools',method:'Pick a method',number:'Number',name:'Name',people:'People',unit:'people'},
    ja:{logo:'ランダム抽選',hero:'今日はどうやって\n選ぶ？',picker:'🎯 抽選ゲーム',tools:'🎲 ゲームツール',method:'抽選方法',number:'番号',name:'名前',people:'人数',unit:'人'},
    es:{logo:'Selector aleatorio',hero:'¿Cómo elegimos\nhoy?',picker:'🎯 Juegos de sorteo',tools:'🎲 Herramientas',method:'Método de sorteo',number:'Número',name:'Nombre',people:'Personas',unit:'personas'},
    zh:{logo:'随机抽选',hero:'今天\n怎么抽？',picker:'🎯 抽选游戏',tools:'🎲 游戏工具',method:'抽选方式',number:'编号',name:'姓名',people:'人数',unit:'人'},
    fr:{logo:'Sélecteur aléatoire',hero:'Comment choisir\naujourd’hui ?',picker:'🎯 Jeux de tirage',tools:'🎲 Outils de jeu',method:'Méthode de tirage',number:'Numéro',name:'Nom',people:'Participants',unit:'personnes'},
    de:{logo:'Zufallsauswahl',hero:'Wie wählen wir\nheute?',picker:'🎯 Auswahlspiele',tools:'🎲 Spielwerkzeuge',method:'Auswahlmethode',number:'Nummer',name:'Name',people:'Personen',unit:'Personen'},
    pt:{logo:'Sorteador aleatório',hero:'Como vamos sortear\nhoje?',picker:'🎯 Jogos de sorteio',tools:'🎲 Ferramentas',method:'Método de sorteio',number:'Número',name:'Nome',people:'Pessoas',unit:'pessoas'},
    id:{logo:'Pemilih Acak',hero:'Mau pilih dengan cara apa\nhari ini?',picker:'🎯 Game Undian',tools:'🎲 Alat Game',method:'Cara memilih',number:'Nomor',name:'Nama',people:'Jumlah orang',unit:'orang'},
    hi:{logo:'रैंडम पिकर',hero:'आज कैसे\nचुनें?',picker:'🎯 पिकर गेम',tools:'🎲 गेम टूल',method:'चुनने का तरीका',number:'नंबर',name:'नाम',people:'कुल लोग',unit:'लोग'},
    pl:{logo:'Losowy wybór',hero:'Jak dziś\nlosujemy?',picker:'🎯 Gry losujące',tools:'🎲 Narzędzia',method:'Metoda losowania',number:'Numer',name:'Nazwa',people:'Liczba osób',unit:'osób'},
    it:{logo:'Selettore casuale',hero:'Come scegliamo\noggi?',picker:'🎯 Giochi di estrazione',tools:'🎲 Strumenti',method:'Metodo di estrazione',number:'Numero',name:'Nome',people:'Persone',unit:'persone'},
    nl:{logo:'Willekeurige kiezer',hero:'Hoe kiezen we\nvandaag?',picker:'🎯 Lottrekspellen',tools:'🎲 Speltools',method:'Kiesmethode',number:'Nummer',name:'Naam',people:'Aantal personen',unit:'personen'},
    tr:{logo:'Rastgele Seçici',hero:'Bugün nasıl\nseçelim?',picker:'🎯 Seçim Oyunları',tools:'🎲 Oyun Araçları',method:'Seçim yöntemi',number:'Numara',name:'İsim',people:'Kişi sayısı',unit:'kişi'},
    vi:{logo:'Bộ chọn ngẫu nhiên',hero:'Hôm nay chọn\nthế nào?',picker:'🎯 Trò chơi chọn',tools:'🎲 Công cụ trò chơi',method:'Cách chọn',number:'Số',name:'Tên',people:'Tổng số người',unit:'người'},
    th:{logo:'สุ่มเลือก',hero:'วันนี้จะสุ่ม\nแบบไหนดี?',picker:'🎯 เกมสุ่ม',tools:'🎲 เครื่องมือเกม',method:'วิธีสุ่ม',number:'หมายเลข',name:'ชื่อ',people:'จำนวนคน',unit:'คน'},
    ar:{logo:'اختيار عشوائي',hero:'كيف نختار\nاليوم؟',picker:'🎯 ألعاب الاختيار',tools:'🎲 أدوات الألعاب',method:'طريقة الاختيار',number:'رقم',name:'اسم',people:'عدد الأشخاص',unit:'أشخاص'}
  };
  const t = core[lang] || core.en;

  function isLanguageSelect(sel){
    const texts=[...sel.options].map(o=>o.textContent.trim());
    const hits=Object.values(names).filter(n=>texts.includes(n)).length;
    return hits >= 3;
  }
  document.querySelectorAll('select').forEach(sel=>{
    if(!isLanguageSelect(sel)) return;
    const parent=sel.parentElement;
    sel.remove();
    if(parent && parent !== document.body && !parent.textContent.trim() && parent.children.length===0) parent.remove();
  });
  document.querySelectorAll('[data-global-language-switch], .global-language-switch, .language-switcher, .language-selector').forEach(el=>el.remove());

  const header=document.querySelector('header');
  if(header){
    const wrap=document.createElement('label');
    wrap.id='canonicalLanguageSwitch';
    wrap.setAttribute('aria-label','Language');
    wrap.style.cssText='display:flex;align-items:center;gap:7px;margin-left:auto;font-size:14px;font-weight:800;color:#6f675d';
    const globe=document.createElement('span'); globe.textContent='🌐';
    const select=document.createElement('select');
    select.id='canonicalLanguageSelect';
    select.style.cssText='min-width:150px;height:38px;border:1px solid #e4ddd1;border-radius:11px;background:#fffdf8;padding:0 34px 0 12px;font:inherit;font-weight:800;color:#211d18';
    Object.entries(names).forEach(([code,label])=>{const o=document.createElement('option');o.value=code;o.textContent=label;o.selected=code===lang;select.append(o)});
    select.addEventListener('change',()=>{location.href=select.value==='ko'?'/' : `/${select.value}/`;});
    wrap.append(globe,select); header.append(wrap);
  }

  const setText=(sel,val)=>{const el=document.querySelector(sel);if(el)el.textContent=val};
  const logo=document.querySelector('.logo'); if(logo) logo.textContent=t.logo;
  const hero=document.querySelector('.hero h1'); if(hero) hero.innerHTML=t.hero.split('\n').map(s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))).join('<br>');
  setText('#showPicker',t.picker);
  setText('#showTools',t.tools);
  setText('.method-label',t.method);
  setText('#numberTab',t.number);
  setText('#nameTab',t.name);
  const totalLabel=document.querySelector('#totalField .label, .field .label'); if(totalLabel){const small=totalLabel.querySelector('small'); if(small){const keep=small.cloneNode(true); totalLabel.textContent=t.people; totalLabel.append(keep);} else totalLabel.textContent=t.people;}
  document.querySelectorAll('.unit').forEach(el=>{if(el.textContent.trim()==='명' || lang!=='ko')el.textContent=t.unit});
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
})();
