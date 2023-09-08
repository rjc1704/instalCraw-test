const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
app.use(cors());
app.get("/", (req, res) => {
  res.send("응답");
});
app.get("/getInstaData", (req, res) => {
  const url = req.query.url;
  console.log("url: ", url);
  async function get(url) {
    try {
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();

      await page.goto(url, { waitUntil: "networkidle0" });
      const imgEl = await page.$(
        "main > div > div > article > div > div > div > div > div > div > img"
      );
      console.log("imgEl: ", imgEl);
      const ImageUrl = await page.evaluate((img) => img.src, imgEl);
      await browser.close();
      res.json({ ImageUrl, hashtags: "#13.7챌린지" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
  get(url);
});

app.listen(port, () => {
  console.log(`listening ${port}`);
});
