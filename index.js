const puppeteer = require('puppeteer')

const express = require('express')
const app = express();
const port = 4000;

app.get("/", async(req, res) => {
  const browser = await puppeteer.launch({headless:'new'});
  const page = await browser.newPage();
  let url = req.query.url
  console.log(req, url)
  await page.goto(url, { waitUntil: "networkidle0" });

  const imgEl = await page.$(
    "main > div > div > article > div > div > div > div > div > div > img"
  )

  const imgSrc = await page.evaluate((img) => img.src, imgEl)
  
  await browser.close();
  console.log(imgSrc)
  res.send({imgSrc, hashtags:"#13.7챌린지"})
})

app.listen(port, () => {
  console.log(`listening ${port}`)
})
