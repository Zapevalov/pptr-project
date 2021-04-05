const puppeteer = require('puppeteer')

describe('My second Puppeteer Test', () => {
  it("should be type into input field", async function() {
    const browser = await puppeteer.launch({
      slowMo: 100,
      headless: false,
      devtools: false
    })

    const page = await browser.newPage()
    await page.goto("https://devexpress.github.io/testcafe/example")
    await page.type('#developer-name', 'Mike', {delay: 50})
    await page.waitForTimeout(2000)
    await browser.close()
  });
})