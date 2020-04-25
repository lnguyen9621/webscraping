const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {
    waitUntil: 'networkidle0',
  });
  await page.pdf({ path: 'hackernews.pdf', format: 'Letter' });

  await browser.close();
})();
