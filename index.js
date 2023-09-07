const puppeteer = require('puppeteer')

const express = require('express')
const app = express();
const port = 3000;

app.get("/get", async(req, res) => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  
  await page.goto(req.url, { waitUntil: "networkidle0" });

  const imgEl = await page.$(
    "main > div > div > article > div > div > div > div > div > div > img"
  )

  const imgSrc = await page.evaluate((img) => img.src, imgEl)
  
  await browser.close();

  res.send(imgSrc)
})

app.listen(port, () => {
  console.log(`listening ${port}`)
})
