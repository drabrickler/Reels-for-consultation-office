// Renderiza cada <section class="slide"> de slides.html a PNG 1080x1920
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path');

(async () => {
  const [html, outDir] = process.argv.slice(2);
  const proxy = process.env.HTTPS_PROXY;
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium',
    proxy: proxy ? { server: proxy } : undefined,
    args: ['--ignore-certificate-errors'],
  });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.resolve(html), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const fonts = await page.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight));
  console.log('fonts loaded:', [...new Set(fonts)].join(', '));
  const ids = await page.$$eval('section.slide', els => els.map(e => e.id));
  for (const id of ids) {
    const el = await page.$('#' + id);
    await el.screenshot({ path: path.join(outDir, id.replace('s', 'slide-0') + '.png') });
  }
  await browser.close();
})();
