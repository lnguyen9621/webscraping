const puppeteer = require('puppeteer');
const fs = require('fs');
//multi url
async function multiUrl() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let url = 'https://www.imdb.com/list/ls016522954/?ref_=nv_tvv_dvd';

  await page.goto(url, { waitUntil: 'networkidle0' });

  let data = await page.$$eval('div.lister-item', els =>
    els.map(el => {
      let imageUrl = el.querySelector('div.lister-item-image a>img').getAttribute('src');
      let title = el.querySelector('h3.lister-item-header a').textContent;
      let year = el.querySelector('h3.lister-item-header span.lister-item-year').textContent;
      let link = el.querySelector('h3.lister-item-header a').href;

      return { title, year, link, imageUrl }
    })
  );

  //console.log(data);

  fs.writeFile('./scrapedData', JSON.stringify(data), (error) => console.log("Write file failed: ", error));

  await browser.close();
}
multiUrl();
/* single url
(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  let url = 'https://www.imdb.com/title/tt7504726/?ref_=ttls_li_tt';

  await page.goto(url, { waitUntil: 'networkidle0' });

  let data = await page.evaluate(() => {
    let title = document.querySelector('div[class="title_wrapper"] > h1')
      .innerText;
    let rating = document.querySelector('span[itemprop="ratingValue"]')
      .innerText;
    let ratingCount = document.querySelector('span[itemprop="ratingCount"]')
      .innerText;

    return { title, rating, ratingCount };
  });

  console.log(data);

  await browser.close();
})();
*/
