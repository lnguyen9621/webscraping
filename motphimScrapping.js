const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'https://motphim.co/phim-le/';
const URL2 = 'https://motphim.co/phim-le/2';
const URL3 = 'https://motphim.co/phim-le/3';
const URL4 = 'https://motphim.co/phim-le/4';
const URL5 = 'https://motphim.co/phim-le/5';
const URL6 = 'https://motphim.co/phim-le/6';
const URL7 = 'https://motphim.co/phim-le/7';
const URL8 = 'https://motphim.co/phim-le/8';
const URL9 = 'https://motphim.co/phim-le/9';
const URL10 = 'https://motphim.co/phim-le/10';


async function main() {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(URL10, { waitUntil: "networkidle2" });

  let data = await page.$$eval('div.list-films li.item', els => els.map(el => {
    //todo
    let title = el.querySelector('a').title;
    let movieUrl = el.querySelector('a').href;
    let imageUrl = el.querySelector('a>img').getAttribute('src');

    return { title, movieUrl, imageUrl }

  }
  ))//end page.$$eval()

  console.log(data);

  fs.writeFile('./motphimcoData_scrapped_0', JSON.stringify(data), (error) => console.log("Writing file failed, error: ", (error)));


  await browser.close();
}//end main()

main();