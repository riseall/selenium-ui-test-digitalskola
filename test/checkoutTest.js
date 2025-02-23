const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const CartPage = require("../pages/cartPage");
const CheckoutPage = require("../pages/checkoutPage");
const data = require("../fixtures/dataTest");

async function checkoutTest() {
  describe("Saucedemo Checkout Test", function () {
    let driver;
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;

    // menambahkan timeout
    this.timeout(60000);

    beforeEach(async function () {
      driver = await new Builder().forBrowser("chrome").build();
      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);
      cartPage = new CartPage(driver);
      checkoutPage = new CheckoutPage(driver);
      //open url
      await loginPage.open(data.baseUrl);
      //login
      await loginPage.login(data.validUser.username, data.validUser.password);
    });

    it("CO-001_Checkout successfully", async () => {
      try {
        // add product to cart
        await inventoryPage.addToCart("Sauce Labs Backpack");
        await inventoryPage.addToCart("Sauce Labs Bike Light");

        // click cart button
        await inventoryPage.goToCart();

        // click checkout button
        await cartPage.checkout();

        // checkout information
        await checkoutPage.checkoutInfo(
          data.customer.firsname,
          data.customer.lastname,
          data.customer.zipcode
        );

        // click finish button
        await checkoutPage.finishCheckout();

        // Assertion checkout success
        await checkoutPage.verifyFinishCheckout(
          data.expectedText.checkoutFinish,
          data.message.checkoutFinish
        );

        console.log(data.log.checkoutSuccess);
      } catch (error) {
        console.log(data.log.testFailed, error);
      }
    });

    after(async function () {
      await driver.quit();
    });
  });
}

checkoutTest();
