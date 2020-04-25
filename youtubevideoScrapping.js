const puppeteer = require("puppeteer");
const fs = require('fs');
//const URL = 'https://www.youtube.com/results?search_query=nhip+song+dong+bang';

const URL = 'https://www.youtube.com/results?search_query=nh%E1%BB%8Bp%20s%E1%BB%91ng%20%C4%91%E1%BB%93ng%20b%E1%BA%B1ng';


//const URL = 'https://www.youtube.com/results?search_query=crud+nodejs+express+react';

async function main() {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: "networkidle2" });

  const data = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.ytd-video-renderer #video-title'))
      .map(el => (
        {
          title: el.getAttribute('title'),
          videoId: el.getAttribute('href').replace('/watch?v=', ''),
          videoUrl: 'https://youtube.com' + el.getAttribute('href'),
          videoEmbeded: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${el.getAttribute('href').replace('/watch?v=', '')}" frameborder="0" allow="accelerometer; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
          description: el.getAttribute('aria-label')
        }
      )).slice(0, 50)
  );//end page.evaluate()


  console.log(data);

  fs.writeFileSync('NhipSongDongBang_scrappedData', JSON.stringify(data), () => console.log('Writing file success!'));

  await browser.close();

}//end main()

main();