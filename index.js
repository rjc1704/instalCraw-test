const puppeteer = require('puppeteer')

const express = require('express')
const app = express();
const port = 3000;

app.get("/getInstaData", async(req, res) => {
  const browser = await puppeteer.launch({headless:'new'});
  const page = await browser.newPage();
  let url = req.query.url
  await page.goto(url, { waitUntil: "networkidle0" });

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
