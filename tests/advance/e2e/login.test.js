const puppeteer = require("puppeteer");
const expect = require("chai").expect;

describe("My e2e Puppeteer Test", () => {
  let browser;
  let page;

  beforeEach(async function() {
    browser = await puppeteer.launch({
      slowMo: 10,
      headless: false,
      devtools: false
    });

    page = await browser.newPage();
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(20000);
  });

  afterEach(async function() {
    await browser.close();
  });

  it("Login Test - Valid Creds", async () => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.waitForSelector('#signin_button')
    await page.click('#signin_button')
    await page.waitForSelector('#login_form')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('input[type="submit"]')
    await page.waitForSelector('#settingsBox')
  });

  it("Login Test - InValid Creds", async () => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.waitForSelector('#signin_button')
    await page.click('#signin_button')
    await page.waitForSelector('#login_form')
    await page.type('#user_login', 'invalid user')
    await page.type('#user_password', 'invalid password')
    await page.click('#user_remember_me')
    await page.click('input[type="submit"]')
    await page.waitForSelector('.alert-error')
  });

});