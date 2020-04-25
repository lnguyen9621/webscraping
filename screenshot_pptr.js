const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 800,
    height: 600,
    deviceScaleFactor: 1,
  });
  await page.goto('https://www.imdb.com/title/tt7504726/?ref_=ttls_li_tt');

  await page.screenshot({ path: 'The Call Of The Wild.png' });

  browser.close();
})();
