import puppeteer from 'puppeteer';
function delay( timeout ) {

  return new Promise(( resolve ) => {

    setTimeout( resolve, timeout );

  });

}
(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  
  // Navigate the page to a URL
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36");
  await page.evaluate("navigator.userAgent");
  await page.goto("https://www.instagram.com/p/CwvJNADvIrQ/", { waitUntil : "networkidle0" } );
  await delay(50000);
  //C:\Users\rimsu\Desktop\노드\
    await page.screenshot({ path: '/Users/rimsu/Desktop/노드/example.png' });
    await browser.close();
    console.log(1)
  // Type into search box
  // await page.type('.search-box__input', 'automate beyond recorder');

  // Wait and click on first result
  // const searchResultSelector = '.search-box__link';


  // Locate the full title with a unique string
  // const imgSrc = await page.$('.fb_reset')
  

  // // Print the full title
  // console.log('The title of this blog post is "%s".', imgSrc);
})();