const { By } = require("selenium-webdriver");
const assert = require("assert");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.titleText = By.xpath("//div[@class='app_logo']");
    this.productList = By.xpath("//div[@data-test='inventory-item-name']");
    this.addToCartButton = By.xpath("//button[@name='add-to-cart']");
    this.removeButton = By.xpath("//button[@id='remove']");
    this.cartButton = By.xpath("//a[@data-test='shopping-cart-link']");
    this.cartBadge = By.xpath("//span[@class='shopping_cart_badge']");
    this.cartPageTitle = By.xpath("//span[@data-test='title']");
  }

  // Assertion login success
  async getTitleText() {
    return await this.driver.findElement(this.titleText).getText();
  }

  async verifyTitleText(ExpectedText, message) {
    const titleText = await this.getTitleText();
    assert.strictEqual(titleText.includes(ExpectedText), true, message);
  }

  // Add to cart Product by name of product
  async addToCart(productName) {
    let products = await this.driver.findElements(this.productList);
    for (let product of products) {
      let name = await product.getText();
      if (name.includes(productName)) {
        await product.click();
        await this.driver.findElement(this.addToCartButton).click();
        break;
      }
    }
  }

  //Assert add to cart success
  async verifyAddToCart(ExpectedText, message) {
    const cartCount = await this.driver.findElement(this.cartBadge).getText();
    assert.strictEqual(cartCount.includes(ExpectedText), true, message);
  }

  //Remove product from cart
  async removeFromCart() {
    await this.driver.findElement(this.removeButton).click();
  }

  // Assert remove product from cart
  //   async verifyRemoveFromCart(ExpectedText, message) {
  //     const cartCount = await this.driver.findElement(this.cartBadge).getText();
  //     assert.strictEqual(cartCount.includes(ExpectedText), true, message);
  //   }

  //click cart button
  async goToCart() {
    await this.driver.findElement(this.cartButton).click();
  }

  // Assert cartPage
  async verifyCartPage(ExpectedText, message) {
    const cartPageTitle = await this.driver
      .findElement(this.cartPageTitle)
      .getText();
    assert.strictEqual(cartPageTitle.includes(ExpectedText), true, message);
  }
}

module.exports = InventoryPage;
