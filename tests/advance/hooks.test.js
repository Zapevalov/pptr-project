const puppeteer = require("puppeteer");
const expect = require("chai").expect;

describe("My second Puppeteer Test", () => {
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

  beforeEach(async () => {
    //TODO
  });

  afterEach(async () => {
    //TODO
  });


  it("should get title and url page", async function() {
    await page.goto("https://github.com");
    const title = await page.title();
    const url = await page.url();
    console.log(
      "TITLE: " + title,
      "URL: " + url
    );
    const text = await page.$eval("body > div.application-main > main > div > div.overflow-hidden > div.home-hero-container.position-relative.js-webgl-globe-data > div.home-hero.position-absolute.z-1.top-0.right-0.bottom-0.left-0.overflow-hidden > div > div > div.ml-md-n3.mr-md-3.col-12.col-lg-6.text-center.text-md-left > h1",
      el => el.textContent);
    const countOfElements = await page.$$eval("h1", elements => elements.length);
    console.log("Text in the H1:" + text);

    expect(title).to.be.a("string", "GitHub: Where the world builds software · GitHub URL");
    expect(url).to.include("github.com");
    expect(text).to.be.a("string", "Where the world builds software");
    expect(countOfElements).to.equal(1);
  });
});