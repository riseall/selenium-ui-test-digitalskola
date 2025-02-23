const { By } = require("selenium-webdriver");
const assert = require("assert");

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
    this.titlePage = By.xpath('//span[@class="title"]');
    this.firsname = By.id("first-name");
    this.lastname = By.id("last-name");
    this.zipcode = By.id("postal-code");
    this.continueButton = By.id("continue");
    this.finishButton = By.xpath("//button[@id='finish']");
    this.orderComplete = By.xpath('//h2[@class="complete-header"]');
  }

  // checkout information
  async checkoutInfo(firsname, lastname, zipcode) {
    await this.driver.findElement(this.firsname).sendKeys(firsname);
    await this.driver.findElement(this.lastname).sendKeys(lastname);
    await this.driver.findElement(this.zipcode).sendKeys(zipcode);
    await this.driver.findElement(this.continueButton).click();
  }

  // Assertion checkout success
  async verifyCheckoutInfo(ExpectedText, message) {
    const infoText = await this.driver.findElement(this.titlePage).getText();
    assert.strictEqual(infoText.includes(ExpectedText), true, message);
  }

  async finishCheckout() {
    await this.driver.findElement(this.finishButton).click();
  }

  async verifyFinishCheckout(ExpectedText, message) {
    const finishText = await this.driver
      .findElement(this.orderComplete)
      .getText();
    assert.strictEqual(finishText.includes(ExpectedText), true, message);
  }
}

module.exports = CheckoutPage;
