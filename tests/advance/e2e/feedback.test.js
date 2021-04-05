const puppeteer = require("puppeteer");
const expect = require("chai").expect;

describe("My feedback form Puppeteer Test", () => {
  let browser;
  let page;

  before(async function() {
    browser = await puppeteer.launch({
      slowMo: 10,
      headless: false,
      devtools: false
    });

    page = await browser.newPage();
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(20000);
  });

  after(async function() {
    await browser.close();
  });

  it("Display FeedBack Form", async () => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.waitForSelector('#feedback')
    await page.click('#feedback')
  });

  it("Submit Feedback FOrm", async () => {
    await page.waitForSelector('form')
    await page.type('#name', 'name')
    await page.type('#email', 'email@email.com')
    await page.type('#subject', 'Subject')
    await page.type('#comment', 'comment')
    await page.click('input[type="submit"]')
  });

  it("Display results page", async () => {
    await page.waitForSelector('#feedback-title')
    const url = await page.url()
    expect(url).to.include("/sendFeedback.html")
  });

});