const { By } = require("selenium-webdriver");
const assert = require("assert");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameInput = By.id("user-name");
    this.passwordInput = By.id("password");
    this.loginButton = By.id("login-button");
    this.errorMessage = By.xpath("//h3[@data-test='error']");
  }

  async open(url) {
    await this.driver.get(url);
  }

  async login(username, password) {
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }

  async getErrorMessage() {
    return await this.driver.findElement(this.errorMessage).getText();
  }

  async assertErrorMessage(expectedText, message) {
    const actualMessage = await this.getErrorMessage();
    assert.strictEqual(actualMessage.includes(expectedText), true, message);
  }
}

module.exports = LoginPage;
