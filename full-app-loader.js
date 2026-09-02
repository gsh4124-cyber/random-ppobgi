(() => {
  const SUPPORTED = ['en','ja','es','zh','fr','de','pt','id','hi','pl','it','nl','tr','vi','th','ar'];
  const requested = location.pathname.split('/').filter(Boolean)[0] || 'en';
  const lang = SUPPORTED.includes(requested) ? requested : 'en';
  const origin = 'https://random-ppobgi.pages.dev';
  const meta = {
    en:{title:'Random Picker | 8 Picker Games & Game Tools',description:'Free random picker with Ladder, Wheel, Draw, Pinball, Race, Capsule, Slot, Bomb, plus dice, coin flip, order and team tools.',locale:'en_US',name:'Random Picker'},
    ja:{title:'ランダム抽選 | 8種類の抽選ゲームとゲームツール',description:'あみだくじ、ルーレット、くじ引き、ピンボール、レース、カプセル、スロット、爆弾とゲーム用ツールを無料で使えます。',locale:'ja_JP',name:'ランダム抽選'},
    es:{title:'Selector aleatorio | 8 juegos de sorteo y herramientas',description:'Selector aleatorio gratuito con escalera, ruleta, sorteo, pinball, carrera, cápsula, tragamonedas, bomba y herramientas de juego.',locale:'es_ES',name:'Selector aleatorio'},
    zh:{title:'随机抽选 | 8种抽选游戏与游戏工具',description:'免费随机抽选工具：梯子、转盘、抽签、弹珠、竞赛、胶囊、老虎机、炸弹，以及骰子、分组等游戏工具。',locale:'zh_CN',name:'随机抽选'},
    fr:{title:'Sélecteur aléatoire | 8 jeux de tirage et outils',description:'Sélecteur aléatoire gratuit avec échelle, roulette, tirage, flipper, course, capsule, machine à sous, bombe et outils de jeu.',locale:'fr_FR',name:'Sélecteur aléatoire'},
    de:{title:'Zufallsauswahl | 8 Auswahlspiele & Spielwerkzeuge',description:'Kostenlose Zufallsauswahl mit Leiter, Roulette, Los, Flipper, Rennen, Kapsel, Slot, Bombe sowie Würfel- und Teamtools.',locale:'de_DE',name:'Zufallsauswahl'},
    pt:{title:'Sorteador aleatório | 8 jogos de sorteio e ferramentas',description:'Sorteador aleatório grátis com escada, roleta, sorteio, pinball, corrida, cápsula, caça-níquel, bomba e ferramentas de jogo.',locale:'pt_BR',name:'Sorteador aleatório'},
    id:{title:'Pemilih Acak | 8 Game Undian & Alat Game',description:'Pemilih acak gratis dengan tangga, roda, undian, pinball, balapan, kapsul, slot, bom, dadu, pembagi tim, dan alat lainnya.',locale:'id_ID',name:'Pemilih Acak'},
    hi:{title:'रैंडम पिकर | 8 पिकर गेम और गेम टूल',description:'सीढ़ी, रूलेट, ड्रॉ, पिनबॉल, रेस, कैप्सूल, स्लॉट, बम, पासा और टीम जनरेटर वाला मुफ्त रैंडम पिकर।',locale:'hi_IN',name:'रैंडम पिकर'},
    pl:{title:'Losowy wybór | 8 gier losujących i narzędzia',description:'Darmowy losowy wybór: drabinka, ruletka, los, pinball, wyścig, kapsuła, slot, bomba oraz kości i podział na zespoły.',locale:'pl_PL',name:'Losowy wybór'},
    it:{title:'Selettore casuale | 8 giochi di estrazione e strumenti',description:'Selettore casuale gratuito con scala, roulette, estrazione, flipper, gara, capsula, slot, bomba, dadi e divisione squadre.',locale:'it_IT',name:'Selettore casuale'},
    nl:{title:'Willekeurige kiezer | 8 trekspellen & speltools',description:'Gratis willekeurige kiezer met ladder, roulette, loting, pinball, race, capsule, slot, bom, dobbelstenen en teamverdeler.',locale:'nl_NL',name:'Willekeurige kiezer'},
    tr:{title:'Rastgele Seçici | 8 seçim oyunu ve oyun aracı',description:'Merdiven, rulet, kura, pinball, yarış, kapsül, slot, bomba, zar ve takım bölme içeren ücretsiz rastgele seçici.',locale:'tr_TR',name:'Rastgele Seçici'},
    vi:{title:'Bộ chọn ngẫu nhiên | 8 trò chơi chọn & công cụ',description:'Bộ chọn ngẫu nhiên miễn phí với thang, vòng quay, bốc thăm, pinball, đua, viên nang, slot, bom, xúc xắc và chia đội.',locale:'vi_VN',name:'Bộ chọn ngẫu nhiên'},
    th:{title:'สุ่มเลือก | 8 เกมสุ่มและเครื่องมือเกม',description:'เครื่องมือสุ่มฟรี พร้อมบันได รูเล็ต จับฉลาก พินบอล แข่ง แคปซูล สล็อต ระเบิด ลูกเต๋า และแบ่งทีม',locale:'th_TH',name:'สุ่มเลือก'},
    ar:{title:'اختيار عشوائي | 8 ألعاب اختيار وأدوات ألعاب',description:'أداة اختيار عشوائي مجانية تضم السلم والروليت والقرعة والبينبول والسباق والكبسولة والسلوت والقنبلة والنرد وتقسيم الفرق.',locale:'ar_AR',name:'اختيار عشوائي'}
  };
  const m = meta[lang];
  const canonical = `${origin}/${lang}/`;
  const alternates = [['ko',`${origin}/`], ...SUPPORTED.map(code=>[code,`${origin}/${code}/`])]
    .map(([code,href])=>`<link rel="alternate" hreflang="${code}" href="${href}">`).join('') + `<link rel="alternate" hreflang="x-default" href="${origin}/en/">`;

  fetch('/index.html', { cache: 'no-store' })
    .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
    .then(html => {
      const schema = JSON.stringify({'@context':'https://schema.org','@type':'WebApplication',name:m.name,url:canonical,description:m.description,applicationCategory:'UtilitiesApplication',operatingSystem:'Any',inLanguage:lang,isAccessibleForFree:true,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}});
      html = html
        .replace('<html lang="ko">', `<html lang="${lang}"${lang==='ar'?' dir="rtl"':''}>`)
        .replace('<head>', `<head><base href="/"><script>window.__RANDOM_PICKER_LANG__=${JSON.stringify(lang)};<\/script>`)
        .replace(/<title>[\s\S]*?<\/title>/i, `<title>${m.title}</title>`)
        .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${m.description}">`)
        .replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}">${alternates}`)
        .replace(/<meta property="og:locale"[^>]*>/i, `<meta property="og:locale" content="${m.locale}">`)
        .replace(/<meta property="og:site_name"[^>]*>/i, `<meta property="og:site_name" content="${m.name}">`)
        .replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${m.title}">`)
        .replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${m.description}">`)
        .replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonical}">`)
        .replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${m.title}">`)
        .replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${m.description}">`)
        .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script type="application/ld+json">${schema}<\/script>`)
        .replace('</body>', `<script src="/locales.js"><\/script><script src="/i18n-v2.js"><\/script><script src="/language-switch.js"><\/script></body>`);
      document.open(); document.write(html); document.close();
    })
    .catch(err => {
      console.error(err);
      document.body.innerHTML = `<main style="font-family:system-ui;padding:32px"><h1>${m.name}</h1><p>Loading failed. <a href="/">Open the main version</a></p></main>`;
    });
})();
