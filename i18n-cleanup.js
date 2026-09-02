(() => {
  const lang=window.__RANDOM_PICKER_LANG__||location.pathname.split('/').filter(Boolean)[0]||'ko';
  const names={ko:'한국어',en:'English',ja:'日本語',es:'Español',zh:'中文',fr:'Français',de:'Deutsch',pt:'Português',id:'Bahasa Indonesia',hi:'हिन्दी',pl:'Polski',it:'Italiano',nl:'Nederlands',tr:'Türkçe',vi:'Tiếng Việt',th:'ไทย',ar:'العربية'};
  const core={
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
  const jaExtra={
    '참여자는 1번부터 자동으로 만들어집니다.':'参加者は1番から自動で作成されます。','뽑을 인원':'抽選人数','결과':'結果','당첨':'当選','시작':'開始',
    '주사위':'サイコロ','윷놀이':'ユンノリ','동전':'コイン','순서':'順番','팀 나누기':'チーム分け','주사위 굴리기':'サイコロを振る',
    '최대 6개까지 한 번에 굴릴 수 있어요.':'最大6個まで一度に振れます。','개수':'個数','굴리기':'振る','🎲 굴려보세요':'🎲 振ってみよう',
    '게임 진행에 바로 쓰는 5가지 도구':'ゲームですぐ使える5つのツール','입력한 내용은 이 브라우저에서만 사용돼요':'入力内容はこのブラウザ内でのみ使用されます。',
    '8가지 방식으로 원하는 사람을 뽑아보세요':'8つの方法で好きな人を抽選できます','당첨 결과를 이어서 활용할 수 있어요':'抽選結果をそのまま活用できます',
    '서비스 소개':'サービス紹介','사용방법':'使い方','개인정보처리방침':'プライバシー','이용약관':'利用規約','문의':'お問い合わせ',
    '입력한 내용은 브라우저 밖으로 전송되지 않습니다.':'入力内容はブラウザの外部に送信されません。','다시 뽑기':'もう一度抽選','당첨자 제외하고 다시 뽑기':'当選者を除いて再抽選','바로 결과 보기':'結果をすぐ表示'
  };
  const enExtra={'참여자는 1번부터 자동으로 만들어집니다.':'Participants are created automatically from 1.','뽑을 인원':'Number to pick','주사위':'Dice','윷놀이':'Yut','동전':'Coin','순서':'Order','팀 나누기':'Teams','주사위 굴리기':'Roll dice','최대 6개까지 한 번에 굴릴 수 있어요.':'Roll up to 6 dice at once.','개수':'Count','굴리기':'Roll','🎲 굴려보세요':'🎲 Roll the dice','게임 진행에 바로 쓰는 5가지 도구':'5 handy game tools','입력한 내용은 이 브라우저에서만 사용돼요':'Your input stays in this browser.'};
  const t=core[lang]||core.en;
  const extra=lang==='ja'?jaExtra:(lang==='en'?enExtra:{});

  function isLanguageSelect(sel){const texts=[...sel.options].map(o=>o.textContent.trim());return Object.values(names).filter(n=>texts.includes(n)).length>=3;}
  function removeLanguageUI(){
    document.querySelectorAll('#canonicalLanguageSwitch,#fullLanguageSelect,#canonicalLanguageSelect,[data-global-language-switch],.global-language-switch,.language-switcher,.language-selector').forEach(el=>{const p=el.parentElement;if(p&&p.children.length<=2&&/🌐/.test(p.textContent))p.remove();else el.remove();});
    document.querySelectorAll('select').forEach(sel=>{if(!isLanguageSelect(sel))return;const p=sel.parentElement;if(p&&p!==document.body&&p.children.length<=2)p.remove();else sel.remove();});
    document.querySelectorAll('span,button,label,div').forEach(el=>{if(el.id==='finalLanguageSwitch')return;if(el.children.length===0&&el.textContent.trim()==='🌐')el.remove();});
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{if(n.parentElement?.closest('#finalLanguageSwitch'))return;if(n.nodeValue.trim()==='🌐')n.nodeValue='';});
  }
  function createLanguageUI(){
    if(document.querySelector('#finalLanguageSwitch'))return;
    const host=document.querySelector('.wrap')||document.body; if(host!==document.body)host.style.position='relative';
    const box=document.createElement('label');box.id='finalLanguageSwitch';box.setAttribute('aria-label','Language');
    box.style.cssText='position:absolute;right:15px;top:18px;z-index:30;display:flex;align-items:center;gap:7px;font-size:14px;font-weight:800;color:#6f675d';
    const globe=document.createElement('span');globe.textContent='🌐';
    const select=document.createElement('select');select.style.cssText='min-width:128px;height:38px;border:1px solid #e4ddd1;border-radius:11px;background:#fffdf8;padding:0 30px 0 10px;font:inherit;font-weight:800;color:#211d18';
    Object.entries(names).forEach(([code,label])=>{const o=document.createElement('option');o.value=code;o.textContent=label;o.selected=code===lang;select.append(o)});
    select.addEventListener('change',()=>{location.href=select.value==='ko'?'/' : `/${select.value}/`;});box.append(globe,select);host.append(box);
  }
  function replaceExact(){
    if(!Object.keys(extra).length)return;const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(n=>{if(n.parentElement?.closest('#finalLanguageSwitch')||['SCRIPT','STYLE'].includes(n.parentElement?.tagName))return;const s=n.nodeValue.trim();if(extra[s])n.nodeValue=n.nodeValue.replace(s,extra[s]);});
  }
  function applyCore(){
    const setText=(sel,val)=>{const el=document.querySelector(sel);if(el)el.textContent=val};
    const logo=document.querySelector('.logo');if(logo)logo.textContent=t.logo;
    const hero=document.querySelector('.hero h1');if(hero)hero.innerHTML=t.hero.split('\n').map(s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))).join('<br>');
    setText('#showPicker',t.picker);setText('#showTools',t.tools);setText('.method-label',t.method);setText('#numberTab',t.number);setText('#nameTab',t.name);
    document.querySelectorAll('.unit').forEach(el=>{if(el.textContent.trim()==='명'||lang!=='ko')el.textContent=t.unit});
    document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  }
  function run(){removeLanguageUI();applyCore();replaceExact();createLanguageUI();}
  [0,100,350,900,1800].forEach(ms=>setTimeout(run,ms));
  let timer;new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(()=>{applyCore();replaceExact();removeLanguageUI();createLanguageUI();},30)}).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
