export async function onRequest(context) {
  const response = await context.next();
  const url = new URL(context.request.url);
  if (!response.headers.get('content-type')?.includes('text/html')) return response;

  const langs=['ko','en','ja','es','zh','fr','de','pt','id','hi','pl','it','nl','tr','vi','th','ar'];
  const supported=new Set(langs);
  const names={ko:'랜덤뽑기',en:'Random Picker',ja:'ランダム抽選',es:'Selector aleatorio',zh:'随机抽选',fr:'Sélecteur aléatoire',de:'Zufallsauswahl',pt:'Sorteador aleatório',id:'Pemilih Acak',hi:'रैंडम पिकर',pl:'Losowy wybór',it:'Selettore casuale',nl:'Willekeurige kiezer',tr:'Rastgele Seçici',vi:'Bộ chọn ngẫu nhiên',th:'สุ่มเลือก',ar:'اختيار عشوائي'};
  const desc={ko:'번호·이름 뽑기 8종과 주사위, 윷놀이, 동전, 순서 정하기, 팀 나누기를 무료로 이용하세요.',en:'Free random picker with 8 picker games plus dice, coin, order and team tools.',ja:'8つの抽選ゲームとサイコロ、コイン、順番決め、チーム分けを無料で使えます。',es:'Selector aleatorio gratis con 8 juegos de sorteo, dados, moneda, orden y equipos.',zh:'免费的随机抽选工具，包含8种抽选游戏、骰子、硬币、排序和分组工具。',fr:'Sélecteur aléatoire gratuit avec 8 jeux de tirage, dés, pièce, ordre et équipes.',de:'Kostenlose Zufallsauswahl mit 8 Auswahlspielen sowie Würfel-, Münz-, Reihenfolge- und Teamtools.',pt:'Sorteador aleatório grátis com 8 jogos, dados, moeda, ordem e divisão de times.',id:'Pemilih acak gratis dengan 8 game undian serta alat dadu, koin, urutan, dan tim.',hi:'8 पिकर गेम, पासा, सिक्का, क्रम और टीम टूल वाला मुफ्त रैंडम पिकर।',pl:'Darmowy losowy wybór z 8 grami oraz kośćmi, monetą, kolejnością i podziałem na drużyny.',it:'Selettore casuale gratuito con 8 giochi, dadi, moneta, ordine e squadre.',nl:'Gratis willekeurige kiezer met 8 trekspellen en tools voor dobbelstenen, munt, volgorde en teams.',tr:'8 seçim oyunu ile zar, yazı tura, sıra ve takım araçları sunan ücretsiz rastgele seçici.',vi:'Bộ chọn ngẫu nhiên miễn phí với 8 trò chơi cùng xúc xắc, đồng xu, thứ tự và chia đội.',th:'เครื่องมือสุ่มฟรีพร้อม 8 เกม ลูกเต๋า เหรียญ ลำดับ และแบ่งทีม',ar:'أداة اختيار عشوائي مجانية تضم 8 ألعاب مع النرد والعملة والترتيب وتقسيم الفرق.'};
  const titles=Object.fromEntries(langs.map(l=>[l,`${names[l]} | 8 ${l==='ko'?'가지 뽑기 게임':l==='ja'?'つの抽選ゲーム':l==='zh'?'种抽选游戏':l==='ar'?'ألعاب اختيار':'Random Picker Games'}`]));
  const origin='https://random-ppobgi.pages.dev';
  const alternates=langs.map(l=>`<link rel="alternate" hreflang="${l}" href="${origin}/${l==='ko'?'':l+'/'}">`).join('')+`<link rel="alternate" hreflang="x-default" href="${origin}/en/">`;
  const infoPage=/^\/(about|guide|privacy|terms|contact)\/$/.test(url.pathname);
  const rootPage=url.pathname==='/';
  const fullSource=url.pathname==='/index.html';
  const languageMatch=url.pathname.match(/^\/(en|ja|es|zh|fr|de|pt|id|hi|pl|it|nl|tr|vi|th|ar)\/$/);

  if(fullSource){
    return new HTMLRewriter().on('body',{element(el){el.append('<script src="/global-i18n-dynamic.js"><\/script>',{html:true});}}).transform(response);
  }

  if(languageMatch){
    const lang=languageMatch[1];
    return new HTMLRewriter()
      .on('html',{element(el){el.setAttribute('lang',lang);if(lang==='ar')el.setAttribute('dir','rtl');}})
      .on('title',{element(el){el.setInnerContent(titles[lang]);}})
      .on('head',{element(el){el.append(`<meta name="description" content="${desc[lang]}">${alternates}`,{html:true});}})
      .transform(response);
  }

  if(!rootPage&&!infoPage)return response;
  if(rootPage){
    return new HTMLRewriter()
      .on('head',{element(el){el.append(alternates,{html:true});}})
      .on('body',{element(el){el.append('<script src="/ko-language.js"><\/script>',{html:true});}})
      .transform(response);
  }

  let lang=url.searchParams.get('lang')||'ko';if(!supported.has(lang))lang='ko';if(lang==='ko')return response;
  const init=`<script>window.__RANDOM_PICKER_LANG__=${JSON.stringify(lang)};<\/script><script src="/global-i18n.js"><\/script>`;
  return new HTMLRewriter().on('body',{element(el){el.append(init,{html:true});}}).transform(response);
}
