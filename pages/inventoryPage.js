const { By } = require("selenium-webdriver");
const assert = require("assert");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.titleText = By.xpath("//div[@class='app_logo']");
    this.checkoutButton = By.xpath(
      "//button[@id='add-to-cart-sauce-labs-bike-light']"
    );
  }

  async getTitleText() {
    return await this.driver.findElement(this.titleText).getText();
  }

  async verifyTitleText(ExpectedText, message) {
    const titleText = await this.getTitleText();
    assert.strictEqual(titleText.includes(ExpectedText), true, message);
  }
}

module.exports = InventoryPage;
