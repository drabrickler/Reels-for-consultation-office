// Renderiza slide 1 y slide 2 a PNG 1080x1920
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path');
(async () => {
  const [html, outDir] = process.argv.slice(2);
  const proxy = process.env.HTTPS_PROXY;
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: proxy ? { server: proxy } : undefined, args: ['--ignore-certificate-errors'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.resolve(html), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // busca el mayor tamaño de letra con el que toda la biografía cabe (termina antes de y=1885)
  let lo = 24, hi = 40, best = lo;
  const bottom = async (fs) => page.evaluate((fs) => { document.documentElement.style.setProperty('--fs', fs + 'px'); return document.querySelector('#txt .end').getBoundingClientRect().bottom - document.querySelector('#s2').getBoundingClientRect().top; }, fs);
  while (hi - lo > 0.25) { const mid = (lo + hi) / 2; if ((await bottom(mid)) <= 1885) { best = mid; lo = mid; } else hi = mid; }
  console.log('tamaño de letra:', best.toFixed(2), 'px; termina en y =', Math.round(await bottom(best)));
  await (await page.$('#s1')).screenshot({ path: path.join(outDir, 'slide-01.png') });
  await (await page.$('#s2')).screenshot({ path: path.join(outDir, 'slide-02.png') });
  await browser.close();
})();
