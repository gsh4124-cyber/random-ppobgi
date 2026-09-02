export async function onRequest(context) {
  const response = await context.next();
  const url = new URL(context.request.url);
  if (!response.headers.get('content-type')?.includes('text/html')) return response;

  const supported = new Set(['ko','en','ja','es','zh','fr','de','pt','id','hi','pl','it','nl','tr','vi','th','ar']);
  const infoPage = /^\/(about|guide|privacy|terms|contact)\/$/.test(url.pathname);
  const rootPage = url.pathname === '/';
  const fullSource = url.pathname === '/index.html';

  if (fullSource) {
    return new HTMLRewriter().on('body', { element(el) { el.append('<script src="/global-i18n-dynamic.js"><\/script>', { html: true }); } }).transform(response);
  }
  if (!rootPage && !infoPage) return response;

  if (rootPage) {
    return new HTMLRewriter().on('body', { element(el) { el.append('<script src="/ko-language.js"><\/script>', { html: true }); } }).transform(response);
  }

  let lang = url.searchParams.get('lang') || 'ko';
  if (!supported.has(lang)) lang = 'ko';
  if (lang === 'ko') return response;
  const init = `<script>window.__RANDOM_PICKER_LANG__=${JSON.stringify(lang)};<\/script><script src="/global-i18n.js"><\/script>`;
  return new HTMLRewriter().on('body', { element(el) { el.append(init, { html: true }); } }).transform(response);
}
