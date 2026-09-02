(() => {
  const lang = window.__RANDOM_PICKER_LANG__ || location.pathname.split('/').filter(Boolean)[0] || 'ko';
  const names = {ko:'한국어',en:'English',ja:'日本語',es:'Español',zh:'中文',fr:'Français',de:'Deutsch',pt:'Português',id:'Bahasa Indonesia',hi:'हिन्दी',pl:'Polski',it:'Italiano',nl:'Nederlands',tr:'Türkçe',vi:'Tiếng Việt',th:'ไทย',ar:'العربية'};
  const T = {
    en:{'랜덤 뽑기':'Random Picker','초기화':'Reset','오늘은 어떻게 뽑을까?':'How should we pick today?','결과는 랜덤, 방식은 마음대로.':'Random result, your choice of method.','뽑기 게임':'Picker Games','게임 도구':'Game Tools','뽑기 방식':'Pick a method','사다리':'Ladder','룰렛':'Roulette','제비':'Draw','핀볼':'Pinball','경주':'Race','캡슐':'Capsule','슬롯':'Slot','폭탄':'Bomb','번호':'Number','이름':'Name','총 인원':'People','명':'people','비교':'Compare','다시 뽑기':'Pick again','당첨자 제외하고 다시 뽑기':'Exclude winner & pick again','바로 결과 보기':'Show result now','서비스 소개':'About','사용방법':'How to use','개인정보처리방침':'Privacy','이용약관':'Terms','문의':'Contact','입력한 내용은 브라우저 밖으로 전송되지 않습니다.':'Your entries stay in your browser.'},
    ja:{'랜덤 뽑기':'ランダム抽選','초기화':'リセット','오늘은 어떻게 뽑을까?':'今日はどうやって選ぶ？','결과는 랜덤, 방식은 마음대로.':'結果はランダム、方法は自由。','뽑기 게임':'抽選ゲーム','게임 도구':'ゲームツール','뽑기 방식':'抽選方法','사다리':'あみだくじ','룰렛':'ルーレット','제비':'くじ引き','핀볼':'ピンボール','경주':'レース','캡슐':'カプセル','슬롯':'スロット','폭탄':'爆弾','번호':'番号','이름':'名前','총 인원':'人数','명':'人','서비스 소개':'サービス紹介','사용방법':'使い方','개인정보처리방침':'プライバシー','이용약관':'利用規約','문의':'お問い合わせ'},
    es:{'랜덤 뽑기':'Selector aleatorio','초기화':'Reiniciar','오늘은 어떻게 뽑을까?':'¿Cómo elegimos hoy?','결과는 랜덤, 방식은 마음대로.':'Resultado aleatorio, método a tu gusto.','뽑기 게임':'Juegos de sorteo','게임 도구':'Herramientas','뽑기 방식':'Método de sorteo','사다리':'Escalera','룰렛':'Ruleta','제비':'Sorteo','핀볼':'Pinball','경주':'Carrera','캡슐':'Cápsula','슬롯':'Tragaperras','폭탄':'Bomba','번호':'Número','이름':'Nombre','총 인원':'Personas','명':'personas'},
    zh:{'랜덤 뽑기':'随机抽选','초기화':'重置','오늘은 어떻게 뽑을까?':'今天怎么抽？','결과는 랜덤, 방식은 마음대로.':'结果随机，方式随你。','뽑기 게임':'抽选游戏','게임 도구':'游戏工具','뽑기 방식':'抽选方式','사다리':'梯子','룰렛':'转盘','제비':'抽签','핀볼':'弹珠','경주':'竞赛','캡슐':'胶囊','슬롯':'老虎机','폭탄':'炸弹','번호':'编号','이름':'姓名','총 인원':'人数','명':'人'},
    fr:{'랜덤 뽑기':'Sélecteur aléatoire','초기화':'Réinitialiser','오늘은 어떻게 뽑을까?':'Comment choisir aujourd’hui ?','결과는 랜덤, 방식은 마음대로.':'Résultat aléatoire, méthode au choix.','뽑기 게임':'Jeux de tirage','게임 도구':'Outils de jeu','뽑기 방식':'Méthode de tirage','사다리':'Échelle','룰렛':'Roulette','제비':'Tirage','핀볼':'Flipper','경주':'Course','캡슐':'Capsule','슬롯':'Machine à sous','폭탄':'Bombe','번호':'Numéro','이름':'Nom','총 인원':'Participants','명':'personnes'},
    de:{'랜덤 뽑기':'Zufallsauswahl','초기화':'Zurücksetzen','오늘은 어떻게 뽑을까?':'Wie wählen wir heute?','결과는 랜덤, 방식은 마음대로.':'Zufälliges Ergebnis, freie Methode.','뽑기 게임':'Auswahlspiele','게임 도구':'Spielwerkzeuge','뽑기 방식':'Auswahlmethode','사다리':'Leiter','룰렛':'Roulette','제비':'Los','핀볼':'Flipper','경주':'Rennen','캡슐':'Kapsel','슬롯':'Spielautomat','폭탄':'Bombe','번호':'Nummer','이름':'Name','총 인원':'Personen','명':'Personen'},
    pt:{'랜덤 뽑기':'Sorteador aleatório','초기화':'Redefinir','오늘은 어떻게 뽑을까?':'Como vamos sortear hoje?','결과는 랜덤, 방식은 마음대로.':'Resultado aleatório, método à sua escolha.','뽑기 게임':'Jogos de sorteio','게임 도구':'Ferramentas','뽑기 방식':'Método de sorteio','사다리':'Escada','룰렛':'Roleta','제비':'Sorteio','핀볼':'Pinball','경주':'Corrida','캡슐':'Cápsula','슬롯':'Caça-níquel','폭탄':'Bomba','번호':'Número','이름':'Nome','총 인원':'Pessoas','명':'pessoas'},
    id:{'랜덤 뽑기':'Pemilih Acak','초기화':'Atur ulang','오늘은 어떻게 뽑을까?':'Mau pilih dengan cara apa hari ini?','결과는 랜덤, 방식은 마음대로.':'Hasil acak, cara pilihanmu.','뽑기 게임':'Game Undian','게임 도구':'Alat Game','뽑기 방식':'Cara memilih','사다리':'Tangga','룰렛':'Roda','제비':'Undian','핀볼':'Pinball','경주':'Balapan','캡슐':'Kapsul','슬롯':'Slot','폭탄':'Bom','번호':'Nomor','이름':'Nama','총 인원':'Jumlah orang','명':'orang'},
    hi:{'랜덤 뽑기':'रैंडम पिकर','초기화':'रीसेट','오늘은 어떻게 뽑을까?':'आज कैसे चुनें?','결과는 랜덤, 방식은 마음대로.':'नतीजा रैंडम, तरीका आपकी पसंद।','뽑기 게임':'पिकर गेम','게임 도구':'गेम टूल','뽑기 방식':'चुनने का तरीका','사다리':'सीढ़ी','룰렛':'रूलेट','제비':'ड्रॉ','핀볼':'पिनबॉल','경주':'रेस','캡슐':'कैप्सूल','슬롯':'स्लॉट','폭탄':'बम','번호':'नंबर','이름':'नाम','총 인원':'कुल लोग','명':'लोग'},
    pl:{'랜덤 뽑기':'Losowy wybór','초기화':'Resetuj','오늘은 어떻게 뽑을까?':'Jak dziś losujemy?','결과는 랜덤, 방식은 마음대로.':'Wynik losowy, metoda dowolna.','뽑기 게임':'Gry losujące','게임 도구':'Narzędzia','뽑기 방식':'Metoda losowania','사다리':'Drabinka','룰렛':'Ruletka','제비':'Los','핀볼':'Pinball','경주':'Wyścig','캡슐':'Kapsuła','슬롯':'Slot','폭탄':'Bomba','번호':'Numer','이름':'Nazwa','총 인원':'Liczba osób','명':'osób'},
    it:{'랜덤 뽑기':'Selettore casuale','초기화':'Reimposta','오늘은 어떻게 뽑을까?':'Come scegliamo oggi?','결과는 랜덤, 방식은 마음대로.':'Risultato casuale, metodo a scelta.','뽑기 게임':'Giochi di estrazione','게임 도구':'Strumenti','뽑기 방식':'Metodo di estrazione','사다리':'Scala','룰렛':'Roulette','제비':'Estrazione','핀볼':'Flipper','경주':'Gara','캡슐':'Capsula','슬롯':'Slot','폭탄':'Bomba','번호':'Numero','이름':'Nome','총 인원':'Persone','명':'persone'},
    nl:{'랜덤 뽑기':'Willekeurige kiezer','초기화':'Reset','오늘은 어떻게 뽑을까?':'Hoe kiezen we vandaag?','결과는 랜덤, 방식은 마음대로.':'Willekeurig resultaat, methode naar keuze.','뽑기 게임':'Lottrekspellen','게임 도구':'Speltools','뽑기 방식':'Kiesmethode','사다리':'Ladder','룰렛':'Roulette','제비':'Loting','핀볼':'Pinball','경주':'Race','캡슐':'Capsule','슬롯':'Slot','폭탄':'Bom','번호':'Nummer','이름':'Naam','총 인원':'Aantal personen','명':'personen'},
    tr:{'랜덤 뽑기':'Rastgele Seçici','초기화':'Sıfırla','오늘은 어떻게 뽑을까?':'Bugün nasıl seçelim?','결과는 랜덤, 방식은 마음대로.':'Sonuç rastgele, yöntem sana kalmış.','뽑기 게임':'Seçim Oyunları','게임 도구':'Oyun Araçları','뽑기 방식':'Seçim yöntemi','사다리':'Merdiven','룰렛':'Rulet','제비':'Kura','핀볼':'Pinball','경주':'Yarış','캡슐':'Kapsül','슬롯':'Slot','폭탄':'Bomba','번호':'Numara','이름':'İsim','총 인원':'Kişi sayısı','명':'kişi'},
    vi:{'랜덤 뽑기':'Bộ chọn ngẫu nhiên','초기화':'Đặt lại','오늘은 어떻게 뽑을까?':'Hôm nay chọn thế nào?','결과는 랜덤, 방식은 마음대로.':'Kết quả ngẫu nhiên, cách chọn tùy bạn.','뽑기 게임':'Trò chơi chọn','게임 도구':'Công cụ trò chơi','뽑기 방식':'Cách chọn','사다리':'Thang','룰렛':'Vòng quay','제비':'Bốc thăm','핀볼':'Pinball','경주':'Đua','캡슐':'Viên nang','슬롯':'Máy kéo','폭탄':'Bom','번호':'Số','이름':'Tên','총 인원':'Tổng số người','명':'người'},
    th:{'랜덤 뽑기':'สุ่มเลือก','초기화':'รีเซ็ต','오늘은 어떻게 뽑을까?':'วันนี้จะสุ่มแบบไหนดี?','결과는 랜덤, 방식은 마음대로.':'ผลลัพธ์สุ่ม วิธีเลือกตามใจคุณ','뽑기 게임':'เกมสุ่ม','게임 도구':'เครื่องมือเกม','뽑기 방식':'วิธีสุ่ม','사다리':'บันได','룰렛':'รูเล็ต','제비':'จับฉลาก','핀볼':'พินบอล','경주':'แข่ง','캡슐':'แคปซูล','슬롯':'สล็อต','폭탄':'ระเบิด','번호':'หมายเลข','이름':'ชื่อ','총 인원':'จำนวนคน','명':'คน'},
    ar:{'랜덤 뽑기':'اختيار عشوائي','초기화':'إعادة ضبط','오늘은 어떻게 뽑을까?':'كيف نختار اليوم؟','결과는 랜덤, 방식은 마음대로.':'النتيجة عشوائية والطريقة اختيارك.','뽑기 게임':'ألعاب الاختيار','게임 도구':'أدوات الألعاب','뽑기 방식':'طريقة الاختيار','사다리':'السلم','룰렛':'الروليت','제비':'القرعة','핀볼':'بينبول','경주':'سباق','캡슐':'كبسولة','슬롯':'سلوت','폭탄':'قنبلة','번호':'رقم','이름':'اسم','총 인원':'عدد الأشخاص','명':'أشخاص'}
  };
  if (lang === 'ko' || !T[lang]) return;
  document.documentElement.lang = lang;
  if (lang === 'ar') document.documentElement.dir = 'rtl';
  const dict = T[lang];
  const translateText = text => {
    const trimmed = text.trim();
    if (!trimmed) return text;
    if (dict[trimmed]) return text.replace(trimmed, dict[trimmed]);
    return text;
  };
  function translate(root=document.body){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{ if(n.parentElement && !['SCRIPT','STYLE'].includes(n.parentElement.tagName)) n.nodeValue=translateText(n.nodeValue); });
    root.querySelectorAll?.('[placeholder]').forEach(el=>{ if(dict[el.placeholder]) el.placeholder=dict[el.placeholder]; });
    root.querySelectorAll?.('[aria-label]').forEach(el=>{ if(dict[el.getAttribute('aria-label')]) el.setAttribute('aria-label',dict[el.getAttribute('aria-label')]); });
  }
  translate();
  const observer=new MutationObserver(records=>{for(const r of records){if(r.type==='childList') r.addedNodes.forEach(n=>{if(n.nodeType===1)translate(n);else if(n.nodeType===3)n.nodeValue=translateText(n.nodeValue)});else if(r.type==='characterData')r.target.nodeValue=translateText(r.target.nodeValue)}});
  observer.observe(document.body,{subtree:true,childList:true,characterData:true});
  const meta={en:['Random Picker | Ladder, Roulette, Draw, Race and More','Free full random picker with ladder, roulette, draw, pinball, race, capsule, slot, bomb and game tools.'],ja:['ランダム抽選 | あみだ・ルーレット・くじ引きなど','あみだ、ルーレット、くじ引き、ピンボール、レース、カプセル、スロット、爆弾を使える無料ランダム抽選ツール。'],es:['Selector aleatorio | Ruleta, sorteo y más','Selector aleatorio gratuito con ruleta, sorteo, carrera y más herramientas.']}[lang];
  if(meta){document.title=meta[0];document.querySelector('meta[name="description"]')?.setAttribute('content',meta[1]);}
  let select=document.querySelector('#fullLanguageSelect');
  if(!select){
    const box=document.createElement('div'); box.style.cssText='position:fixed;right:18px;top:16px;z-index:9999;display:flex;gap:6px;align-items:center;background:rgba(255,253,248,.94);padding:6px 8px;border:1px solid #e4ddd1;border-radius:12px;backdrop-filter:blur(8px)';
    box.innerHTML='<span aria-hidden="true">🌐</span>';
    select=document.createElement('select'); select.id='fullLanguageSelect'; select.style.cssText='border:0;background:transparent;font:inherit;font-weight:700;outline:none';
    Object.entries(names).forEach(([code,label])=>{const o=document.createElement('option');o.value=code;o.textContent=label;select.append(o)}); select.value=lang;
    select.addEventListener('change',()=>{location.href=select.value==='ko'?'/':`/${select.value}/`}); box.append(select); document.body.append(box);
  }
})();
