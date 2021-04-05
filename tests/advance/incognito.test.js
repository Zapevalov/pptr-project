const puppeteer = require("puppeteer");

describe("Device emulation", () => {
  let browser
  let page

  before(async function() {
    browser = await puppeteer.launch({
      slowMo: 10,
      headless: false,
      devtools: false,
      args: [
        '--window-size=1920,1080',
      ]
    })

    ///////      INCOGNITO PART    //////
    const context = await browser.createIncognitoBrowserContext()
    page = await context.newPage()
    /////////


    await page.setDefaultTimeout(10000)
    await page.setDefaultNavigationTimeout(20000)
  });

  after(async function() {
    await console.log('after');
    await browser.close()
  })

  it("should Desktop device test", async function() {
    await page.setViewport({ width: 1650, height: 1050 });
    await page.goto("https://github.com");
    await page.waitForTimeout(5000);
  });

  it("should Tablet device test", async function() {
    const tablet = puppeteer.devices['iPad landscape']
    await page.emulate(tablet)
    await page.goto("https://github.com");
    await page.waitForTimeout(5000);
  });

  it("should Mobile device test", async function() {
    const mobile = puppeteer.devices['iPhone X']
    await page.emulate(mobile)
    await page.goto("https://github.com");
    await page.waitForTimeout(5000);
  });
});