module.exports = {
  click: async function(page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (e) {
      throw new Error(`Could not click on selector: ${selector}`);
    }
  },
  getText: async function(page, element_selector) {
    try {
      await page.waitForSelector(element_selector);
      return await page.$eval(element_selector, element => element.innerHTML);
    } catch (e) {
      throw new Error(`Could get text from selector: ${element_selector}`);
    }
  },
  getCount: async function(page, elements_selector) {
    try {
      await page.waitForSelector(elements_selector);
      return await page.$$eval(elements_selector, elements => elements.length);
    } catch (e) {
      throw new Error(`Could get elements count of selector: ${elements_selector}`);
    }
  },
  typeText: async function(page, element_selector, text) {
    try {
      await page.waitForSelector(element_selector);
      await page.type(element_selector, text, {})
    } catch (e) {
      throw new Error(`Could not type into selector: ${element_selector}`);
    }
  },
  shouldNotExist: async function(page, element_selector) {
    try {
      await page.waitForSelector(element_selector, {hidden: true});
    } catch (e) {
      throw new Error(`Selector: ${element_selector} has not disappear`);
    }
  },
};