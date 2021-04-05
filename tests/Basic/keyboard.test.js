const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('My second Puppeteer Test', () => {
  it("should get title and url page", async function() {
    const browser = await puppeteer.launch({
      slowMo: 0,
      headless: false,
      devtools: false
    })

    const page = await browser.newPage()
    await page.setDefaultTimeout(10000)
    await page.setDefaultNavigationTimeout(20000)


    await page.goto("https://github.com")
    const title = await page.title()
    const url = await page.url()
    console.log(
      'TITLE: ' + title,
      'URL: ' + url
    )
    const text = await page.$eval('body > div.application-main > main > div > div.overflow-hidden > div.home-hero-container.position-relative.js-webgl-globe-data > div.home-hero.position-absolute.z-1.top-0.right-0.bottom-0.left-0.overflow-hidden > div > div > div.ml-md-n3.mr-md-3.col-12.col-lg-6.text-center.text-md-left > h1',
        el => el.textContent)
    const countOfElements = await page.$$eval('h1', elements => elements.length)
    console.log('Text in the H1:' + text)

    expect(title).to.be.a('string', 'GitHub: Where the world builds software · GitHub URL')
    expect(url).to.include('github.com')
    expect(text).to.be.a('string', 'Where the world builds software')
    expect(countOfElements).to.equal(1)

    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.waitForSelector('#searchTerm')
    await page.type('#searchTerm', 'Hello World')
    await page.keyboard.press("Enter", {delay: 10})
    await page.waitForTimeout(2000)

    await browser.close()
  });
})