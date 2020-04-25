const puppeteer = require('puppeteer');
const fs = require("fs");

const URL = 'http://xemphimplus.net/phim-le';
const URL2 = 'http://xemphimplus.net/phim-le/page/2';
const URL3 = 'http://xemphimplus.net/phim-le/page/3';
const URL4 = 'http://xemphimplus.net/phim-le/page/4';
const URL5 = 'http://xemphimplus.net/phim-le/page/5';
const URL6 = 'http://xemphimplus.net/phim-le/page/6';
const URL7 = 'http://xemphimplus.net/phim-le/page/7';
const URL8 = 'http://xemphimplus.net/phim-le/page/8';
const URL9 = 'http://xemphimplus.net/phim-le/page/9';
const URL10 = 'http://xemphimplus.net/phim-le/page/10';

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: "networkidle2" });

  let data = await page.$$eval('article div.halim-item', (els) => els.map(el => {

    let title = el.querySelector('figure>img').getAttribute('title')
    //let title = el.querySelector('h2.entry-title').textContent;
    let movieUrl = el.querySelector('a').href;
    let imageUrl = el.querySelector('figure>img').getAttribute('data-src').replace('/wp-content/', 'http://xemphimplus.net/wp-content/');

    return { title, movieUrl, imageUrl }

  })).catch((error) => console.log(error));

  console.log(data);

  fs.writeFile('./xemphimplus_scrappedData', JSON.stringify(data), (error) => console.log("Writing file failed: ", (error)));

  await browser.close();

}//end of function main();

main();
