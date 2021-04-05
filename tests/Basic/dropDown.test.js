const puppeteer = require('puppeteer')

describe('My second Puppeteer Test', () => {
  it("should be choose 'JavaScript API' field", async function() {
    const browser = await puppeteer.launch({
      slowMo: 100,
      headless: false,
      devtools: false
    })

    const page = await browser.newPage()
    await page.goto("https://devexpress.github.io/testcafe/example")
    await page.type('#developer-name', 'Alexander', {delay: 50})
    await page.click('#tried-test-cafe', {clickCount: 1})
    await page.select('#preferred-interface', 'JavaScript API')
    const msg = 'Lets fill that message with some text'
    await page.type('#comments', msg)
    await page.click('#submit-button')
    await page.waitForSelector('.result-content')
    await page.waitForTimeout(2000)
    await browser.close()
  });
})