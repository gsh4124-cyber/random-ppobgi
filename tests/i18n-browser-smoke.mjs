import { chromium } from 'playwright';

// Final-head QA trigger: visible multilingual residual fixes are applied.
const base = process.env.I18N_TEST_BASE || 'http://127.0.0.1:4173';
const priority = ['en','ja','es','zh','pt','ar'];
const allForeign = ['en','ja','es','zh','fr','de','pt','id','hi','pl','it','nl','tr','vi','th','ar'];
const korean = /[가-힣]/;

const browser = await chromium.launch({headless:true});
let failed = false;
const problems = [];

function assert(ok, message) {
  if (!ok) { failed = true; problems.push(message); }
}
function koreanLines(text) {
  return text.split(/\n+/).map(s=>s.trim()).filter(s=>korean.test(s)).slice(0,12).join(' | ');
}
async function koreanAttrs(page) {
  return page.evaluate(() => {
    const re=/[가-힣]/; const out=[];
    for (const el of document.querySelectorAll('[aria-label],[title],[placeholder]')) {
      for (const key of ['aria-label','title','placeholder']) {
        const value=el.getAttribute(key);
        if (value && re.test(value)) out.push(`${el.tagName.toLowerCase()}#${el.id||''}.${el.className||''} ${key}=${value}`);
      }
    }
    return out.slice(0,16);
  });
}
async function visibleTextWithoutLanguageSwitch(page) {
  return page.evaluate(() => {
    const el=document.getElementById('languageSwitch');
    const previous=el?.style.display ?? '';
    if(el) el.style.display='none';
    const text=document.body.innerText;
    if(el) el.style.display=previous;
    return text;
  });
}

async function waitReady(page) {
  await page.waitForFunction(() => window.__RANDOM_PICKER_I18N_READY__ === true, null, {timeout:10000});
  await page.locator('#languageSwitch').waitFor({state:'attached',timeout:5000});
}

for (const lang of allForeign) {
  const page = await browser.newPage({viewport:{width:1280,height:900}});
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`${base}/${lang}/`, {waitUntil:'networkidle'});
  await waitReady(page);
  assert(await page.locator('#languageSwitch').count() === 1, `${lang}: language selector count is not 1`);
  assert(await page.locator('#languageSwitch .globe').count() === 1, `${lang}: globe count is not 1`);
  assert(await page.locator('#languageSelect').inputValue() === lang, `${lang}: selector does not show current language`);
  assert(await page.locator('.method').count() === 8, `${lang}: expected 8 picker games`);
  assert(await page.locator('.tool-tab').count() === 5, `${lang}: expected 5 game tools`);
  assert(await page.locator('#numberTab').count() === 1 && await page.locator('#nameTab').count() === 1, `${lang}: number/name modes missing`);
  const visibleText = await visibleTextWithoutLanguageSwitch(page);
  assert(!korean.test(visibleText), `${lang}: Korean remains in initial visible UI: ${koreanLines(visibleText)}`);
  const attrs=await koreanAttrs(page);
  assert(attrs.length===0, `${lang}: Korean remains in accessibility attributes: ${attrs.join(' | ')}`);
  assert(errors.length === 0, `${lang}: page errors: ${errors.join(' | ')}`);
  if (lang === 'ar') assert(await page.locator('html').getAttribute('dir') === 'rtl', 'ar: html dir is not rtl');
  await page.close();
}

for (const lang of priority) {
  const page = await browser.newPage({viewport:{width:390,height:844}});
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`${base}/${lang}/`, {waitUntil:'networkidle'});
  await waitReady(page);

  const wheel = page.locator('.method[data-method="wheel"]');
  if (await wheel.count()) await wheel.click();
  await page.locator('#pickBtn').click();
  await page.waitForTimeout(350);

  const show = page.locator('#showAllBtn');
  if (await show.count() && await show.isVisible()) {
    await show.click();
    await page.waitForTimeout(150);
  }
  const dynamicText = await visibleTextWithoutLanguageSwitch(page);
  assert(!korean.test(dynamicText), `${lang}: Korean remains after picker execution: ${koreanLines(dynamicText)}`);
  const attrs=await koreanAttrs(page);
  assert(attrs.length===0, `${lang}: Korean remains in dynamic accessibility attributes: ${attrs.join(' | ')}`);
  assert(errors.length === 0, `${lang}: page errors after execution: ${errors.join(' | ')}`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert(overflow <= 2, `${lang}: mobile horizontal overflow ${overflow}px`);
  assert(await page.locator('#languageSwitch').count() === 1, `${lang}: duplicate selector after interaction`);

  const tools = page.locator('#showTools');
  await tools.click();
  await page.waitForTimeout(80);
  assert(await page.locator('.tool-tab').count() === 5, `${lang}: tools missing after switching tab`);
  const toolText = await visibleTextWithoutLanguageSwitch(page);
  assert(!korean.test(toolText), `${lang}: Korean remains in game tools: ${koreanLines(toolText)}`);
  await page.close();
}

// Korean full app also gets the same single shared language selector. The local
// static server does not run Cloudflare middleware, so load the selector directly.
{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto(`${base}/`,{waitUntil:'networkidle'});
  await page.addScriptTag({url:`${base}/language-switch.js`});
  await page.locator('#languageSwitch').waitFor({state:'attached',timeout:5000});
  assert(await page.locator('#languageSwitch').count()===1,'ko: language selector count is not 1');
  assert(await page.locator('#languageSelect').inputValue()==='ko','ko: selector does not show Korean');
  assert(await page.locator('.method').count()===8,'ko: expected 8 picker games');
  assert(await page.locator('.tool-tab').count()===5,'ko: expected 5 game tools');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  assert(overflow<=2,`ko: mobile horizontal overflow ${overflow}px`);
  assert(errors.length===0,`ko: page errors: ${errors.join(' | ')}`);
  await page.close();
}

await browser.close();
if (failed) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('Browser smoke passed: 16 foreign languages scanned, en/ja/es/zh/pt/ar interactive-mobile checked, and Korean shared-selector/mobile checked.');
