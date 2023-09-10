import puppeteerExtra from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import chromium from "@sparticuz/chromium";

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const url = body.url;
  let result = null;
  try {
    puppeteerExtra.use(stealthPlugin());

    // const browser = await puppeteerExtra.launch({
    //   headless: "new",
    //   executablePath:
    //     "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    // });

    const executablePath = await chromium.executablePath();
    const browser = await puppeteerExtra.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0" });

    const h1 = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      return h1 ? h1.innerText : null;
    });
    // const imgEl = await page.$(
    //   "main > div > div > article > div > div > div > div > div > div > img"
    // );

    // const ImageUrl = await page.evaluate((img) => img.src, imgEl);

    const pages = await browser.pages();
    await Promise.all(pages.map(async (page) => page.close()));
    await browser.close();
    // return `${JSON.stringify({ ImageUrl, hashtags: "#13.7챌린지" })}`;

    result = h1;
    const response = {
      statusCode: 200,
      body:
        JSON.stringify({
          result,
          message: "hello",
        }) ?? "undefined 나왔어",
    };
    console.log("response: ", response);
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};

// handler({
//   url: "https://www.instagram.com/p/CwvJNADvIrQ",
// });

// handler({
//   body: JSON.stringify({
//     url: "https://cobaltintelligence.com/",
//   }),
// });

// handler();
