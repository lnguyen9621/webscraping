const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'https://yeuphimmoi.tv/phim-le/';
const URL2 = 'https://yeuphimmoi.tv/phim-le/page/2/';
const URL3 = 'https://yeuphimmoi.tv/phim-le/page/3/';
const URL4 = 'https://yeuphimmoi.tv/phim-le/page/4/';
const URL5 = 'https://yeuphimmoi.tv/phim-le/page/5/';
const URL6 = 'https://yeuphimmoi.tv/phim-le/page/6/';
const URL7 = 'https://yeuphimmoi.tv/phim-le/page/7/';
const URL8 = 'https://yeuphimmoi.tv/phim-le/page/8/';
const URL9 = 'https://yeuphimmoi.tv/phim-le/page/9/';

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: 'networkidle0' });

  let data = await page.$$eval('article div.ypm-item', (els) => els.map(el => {
    //out
    let title = el.querySelector('p.original_title').textContent;
    let title_vn = el.querySelector('h2.entry-title').textContent;
    //let link = el.querySelector('a').href;
    let movieUrl = el.querySelector('a').href.replace('https://yeuphimmoi.tv/', 'https://yeuphimmoi.tv/xem-phim/') + 'tap-1-sv-1/';
    //let movieUrl = link.replace('https://yeuphimmoi.tv/', 'https://yeuphimmoi.tv/xem-phim/') + 'tap-1-sv-1/';
    let imageUrl = el.querySelector('figure>img').getAttribute('src');

    return { title, title_vn, movieUrl, imageUrl }

  }))

  console.log(data);

  fs.writeFile('./yeuphimmoiData', JSON.stringify(data), (error) => console.log("Writing file error: ", (error)));

  /*
  let originalTitles = await page.$$eval('p.original_title', nodes => nodes.map(node => node.textContent));

  let titles = await page.$$eval('h2.entry-title', nodes => nodes.map(node => node.textContent));

  let imageUrl = await page.$$eval('article img', nodes => nodes.map(node => node.getAttribute('src')));






  //console.log(data);
  /*
  let data = await page.$$eval('article img', (nodes) =>
    nodes.map((node) => {
      let title = node.getAttribute('title');
      let imageUrl = node.getAttribute('src');
      return { title, imageUrl };
    })
  );

  let originalTitles = await page.$$eval('p.original_title', (nodes) =>
    nodes.map((node) => {
      let original_title = node.textContent;
      return { original_title };
    })
  );
  console.log(data, originalTitles);
*/

  await browser.close();
}

main();
