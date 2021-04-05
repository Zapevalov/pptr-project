const puppeteer = require('puppeteer')

describe('My first Puppeteer Test', () => {
  it("should launch the browser", async function() {
    const browser = await puppeteer.launch({
      slowMo: 100,
      headless: false,
      devtools: true
    })

    const page = await browser.newPage()
    await page.goto("https://github.com")
    await page.waitForSelector('h4')
    await page.reload({
      waitUntil: ["networkidle0", "domcontentloaded"]
    })
    await page.waitForTimeout(2000)
    await browser.close()
  });
})