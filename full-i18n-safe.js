(() => {
  const lang=window.__RANDOM_PICKER_LANG__||location.pathname.split('/').filter(Boolean)[0]||'ko';
  const names={ko:'한국어',en:'English',ja:'日本語',es:'Español',zh:'中文',fr:'Français',de:'Deutsch',pt:'Português',id:'Bahasa Indonesia',hi:'हिन्दी',pl:'Polski',it:'Italiano',nl:'Nederlands',tr:'Türkçe',vi:'Tiếng Việt',th:'ไทย',ar:'العربية'};
  const rows={
    en:['Random Picker','Reset','How should we pick today?','Random result, your choice of method.','Picker Games','Game Tools','Pick a method','Ladder','Roulette','Draw','Pinball','Race','Capsule','Slot','Bomb','Number','Name','People'],
    ja:['ランダム抽選','リセット','今日はどうやって選ぶ？','結果はランダム、方法は自由。','抽選ゲーム','ゲームツール','抽選方法','あみだくじ','ルーレット','くじ引き','ピンボール','レース','カプセル','スロット','爆弾','番号','名前','人数'],
    es:['Selector aleatorio','Reiniciar','¿Cómo elegimos hoy?','Resultado aleatorio, método a tu gusto.','Juegos de sorteo','Herramientas','Método de sorteo','Escalera','Ruleta','Sorteo','Pinball','Carrera','Cápsula','Tragaperras','Bomba','Número','Nombre','Personas'],
    zh:['随机抽选','重置','今天怎么抽？','结果随机，方式随你。','抽选游戏','游戏工具','抽选方式','梯子','转盘','抽签','弹珠','竞赛','胶囊','老虎机','炸弹','编号','姓名','人数'],
    fr:['Sélecteur aléatoire','Réinitialiser','Comment choisir aujourd’hui ?','Résultat aléatoire, méthode au choix.','Jeux de tirage','Outils de jeu','Méthode de tirage','Échelle','Roulette','Tirage','Flipper','Course','Capsule','Machine à sous','Bombe','Numéro','Nom','Participants'],
    de:['Zufallsauswahl','Zurücksetzen','Wie wählen wir heute?','Zufälliges Ergebnis, freie Methode.','Auswahlspiele','Spielwerkzeuge','Auswahlmethode','Leiter','Roulette','Los','Flipper','Rennen','Kapsel','Spielautomat','Bombe','Nummer','Name','Personen'],
    pt:['Sorteador aleatório','Redefinir','Como vamos sortear hoje?','Resultado aleatório, método à sua escolha.','Jogos de sorteio','Ferramentas','Método de sorteio','Escada','Roleta','Sorteio','Pinball','Corrida','Cápsula','Caça-níquel','Bomba','Número','Nome','Pessoas'],
    id:['Pemilih Acak','Atur ulang','Mau pilih dengan cara apa hari ini?','Hasil acak, cara pilihanmu.','Game Undian','Alat Game','Cara memilih','Tangga','Roda','Undian','Pinball','Balapan','Kapsul','Slot','Bom','Nomor','Nama','Jumlah orang'],
    hi:['रैंडम पिकर','रीसेट','आज कैसे चुनें?','नतीजा रैंडम, तरीका आपकी पसंद।','पिकर गेम','गेम टूल','चुनने का तरीका','सीढ़ी','रूलेट','ड्रॉ','पिनबॉल','रेस','कैप्सूल','स्लॉट','बम','नंबर','नाम','कुल लोग'],
    pl:['Losowy wybór','Resetuj','Jak dziś losujemy?','Wynik losowy, metoda dowolna.','Gry losujące','Narzędzia','Metoda losowania','Drabinka','Ruletka','Los','Pinball','Wyścig','Kapsuła','Slot','Bomba','Numer','Nazwa','Liczba osób'],
    it:['Selettore casuale','Reimposta','Come scegliamo oggi?','Risultato casuale, metodo a scelta.','Giochi di estrazione','Strumenti','Metodo di estrazione','Scala','Roulette','Estrazione','Flipper','Gara','Capsula','Slot','Bomba','Numero','Nome','Persone'],
    nl:['Willekeurige kiezer','Reset','Hoe kiezen we vandaag?','Willekeurig resultaat, methode naar keuze.','Lottrekspellen','Speltools','Kiesmethode','Ladder','Roulette','Loting','Pinball','Race','Capsule','Slot','Bom','Nummer','Naam','Aantal personen'],
    tr:['Rastgele Seçici','Sıfırla','Bugün nasıl seçelim?','Sonuç rastgele, yöntem sana kalmış.','Seçim Oyunları','Oyun Araçları','Seçim yöntemi','Merdiven','Rulet','Kura','Pinball','Yarış','Kapsül','Slot','Bomba','Numara','İsim','Kişi sayısı'],
    vi:['Bộ chọn ngẫu nhiên','Đặt lại','Hôm nay chọn thế nào?','Kết quả ngẫu nhiên, cách chọn tùy bạn.','Trò chơi chọn','Công cụ trò chơi','Cách chọn','Thang','Vòng quay','Bốc thăm','Pinball','Đua','Viên nang','Máy kéo','Bom','Số','Tên','Tổng số người'],
    th:['สุ่มเลือก','รีเซ็ต','วันนี้จะสุ่มแบบไหนดี?','ผลลัพธ์สุ่ม วิธีเลือกตามใจคุณ','เกมสุ่ม','เครื่องมือเกม','วิธีสุ่ม','บันได','รูเล็ต','จับฉลาก','พินบอล','แข่ง','แคปซูล','สล็อต','ระเบิด','หมายเลข','ชื่อ','จำนวนคน'],
    ar:['اختيار عشوائي','إعادة ضبط','كيف نختار اليوم؟','النتيجة عشوائية والطريقة اختيارك.','ألعاب الاختيار','أدوات الألعاب','طريقة الاختيار','السلم','الروليت','القرعة','بينبول','سباق','كبسولة','سلوت','قنبلة','رقم','اسم','عدد الأشخاص']
  };
  if(lang==='ko'||!rows[lang])return;
  const keys=['랜덤 뽑기','초기화','오늘은 어떻게 뽑을까?','결과는 랜덤, 방식은 마음대로.','뽑기 게임','게임 도구','뽑기 방식','사다리','룰렛','제비','핀볼','경주','캡슐','슬롯','폭탄','번호','이름','총 인원'];
  const dict=Object.fromEntries(keys.map((k,i)=>[k,rows[lang][i]]));
  Object.assign(dict,lang==='en'?{'다시 뽑기':'Pick again','당첨자 제외하고 다시 뽑기':'Exclude winner & pick again','바로 결과 보기':'Show result now','서비스 소개':'About','사용방법':'How to use','개인정보처리방침':'Privacy','이용약관':'Terms','문의':'Contact','입력한 내용은 브라우저 밖으로 전송되지 않습니다.':'Your entries stay in your browser.'}:{});
  document.documentElement.lang=lang;if(lang==='ar')document.documentElement.dir='rtl';
  function apply(){
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const n of nodes){if(['SCRIPT','STYLE'].includes(n.parentElement?.tagName))continue;const s=n.nodeValue.trim();if(dict[s])n.nodeValue=n.nodeValue.replace(s,dict[s]);}
  }
  function selector(){if(document.querySelector('#fullLanguageSelect'))return;const box=document.createElement('div');box.style.cssText='position:fixed;right:18px;top:16px;z-index:9999;display:flex;gap:6px;align-items:center;background:rgba(255,253,248,.95);padding:6px 8px;border:1px solid #e4ddd1;border-radius:12px';const select=document.createElement('select');select.id='fullLanguageSelect';select.style.cssText='border:0;background:transparent;font:inherit;font-weight:700;outline:none';for(const [code,label] of Object.entries(names)){const o=document.createElement('option');o.value=code;o.textContent=label;select.append(o)}select.value=lang;select.addEventListener('change',()=>location.href=select.value==='ko'?'/':`/${select.value}/`);box.append('🌐',select);document.body.append(box);}
  [0,80,250,700,1500].forEach(ms=>setTimeout(()=>{apply();selector()},ms));
})();
