import { chromium } from 'playwright';

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

for (const lang of allForeign) {
  const page = await browser.newPage({viewport:{width:1280,height:900}});
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`${base}/${lang}/`, {waitUntil:'networkidle'});
  await page.waitForFunction(() => window.__RANDOM_PICKER_I18N_READY__ === true, null, {timeout:10000});
  assert(await page.locator('#languageSwitch').count() === 1, `${lang}: language selector count is not 1`);
  assert(await page.locator('#languageSwitch .globe').count() === 1, `${lang}: globe count is not 1`);
  assert(await page.locator('#languageSelect').inputValue() === lang, `${lang}: selector does not show current language`);
  assert(await page.locator('.method').count() === 8, `${lang}: expected 8 picker games`);
  assert(await page.locator('.tool-tab').count() === 5, `${lang}: expected 5 game tools`);
  assert(await page.locator('#numberTab').count() === 1 && await page.locator('#nameTab').count() === 1, `${lang}: number/name modes missing`);
  const visibleText = await page.locator('body').innerText();
  assert(!korean.test(visibleText), `${lang}: Korean remains in initial visible UI`);
  assert(errors.length === 0, `${lang}: page errors: ${errors.join(' | ')}`);
  if (lang === 'ar') assert(await page.locator('html').getAttribute('dir') === 'rtl', 'ar: html dir is not rtl');
  await page.close();
}

for (const lang of priority) {
  const page = await browser.newPage({viewport:{width:390,height:844}});
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`${base}/${lang}/`, {waitUntil:'networkidle'});
  await page.waitForFunction(() => window.__RANDOM_PICKER_I18N_READY__ === true, null, {timeout:10000});

  const wheel = page.locator('.method[data-method="wheel"]');
  if (await wheel.count()) await wheel.click();
  await page.locator('#pickBtn').click();
  await page.waitForTimeout(350);

  const show = page.locator('#showAllBtn');
  if (await show.count() && await show.isVisible()) {
    await show.click();
    await page.waitForTimeout(150);
  }
  const dynamicText = await page.locator('body').innerText();
  assert(!korean.test(dynamicText), `${lang}: Korean remains after picker execution`);
  assert(errors.length === 0, `${lang}: page errors after execution: ${errors.join(' | ')}`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert(overflow <= 2, `${lang}: mobile horizontal overflow ${overflow}px`);
  assert(await page.locator('#languageSwitch').count() === 1, `${lang}: duplicate selector after interaction`);

  const tools = page.locator('#showTools');
  await tools.click();
  await page.waitForTimeout(80);
  assert(await page.locator('.tool-tab').count() === 5, `${lang}: tools missing after switching tab`);
  const toolText = await page.locator('body').innerText();
  assert(!korean.test(toolText), `${lang}: Korean remains in game tools`);
  await page.close();
}

await browser.close();
if (failed) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('Multilingual browser smoke passed for 16 foreign languages; interactive/mobile pass for en, ja, es, zh, pt, ar.');
