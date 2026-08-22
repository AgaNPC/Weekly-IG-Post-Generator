import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 850 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'public/preview.png' });
  await browser.close();
  console.log('Real screenshot saved to public/preview.png');
})();
