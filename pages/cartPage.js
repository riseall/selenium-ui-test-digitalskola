const { By } = require("selenium-webdriver");
const assert = require("assert");

class CartPage {
  constructor(driver) {
    this.driver = driver;
    this.checkoutButton = By.id("checkout");
    this.checkoutInfo = By.xpath('//span[@data-test="title"]');
  }

  // checkout products
  async checkout() {
    await this.driver.findElement(this.checkoutButton).click();
  }

  // Assert checkout success
  async verifyCheckout(ExpectedText, message) {
    const checkoutInfo = await this.driver
      .findElement(this.checkoutInfo)
      .getText();
    assert.strictEqual(checkoutInfo.includes(ExpectedText), true, message);
  }
}

module.exports = CartPage;
