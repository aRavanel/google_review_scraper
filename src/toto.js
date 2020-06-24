const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: [
      '--no-sandbox'
    ]
  });
  let result = {};
  try {
    let page = await browser.newPage();
    // await page.setViewport({ width: 1366, height: 768 });
    await page.goto('https://www.google.com/maps/place/Canoe+Kayak+Raids/@43.1869945,5.6274214,15z/data=!4m2!3m1!1s0x0:0x222d6153bccef9f7?sa=X&ved=2ahUKEwiwtIuY14bqAhWjxIUKHYgGDS8Q_BIwDXoECBEQCA', {waitUntil: 'networkidle2'});
    let count = await page.evaluate(() => {
      return {
        count: document.querySelector('button.widget-pane-link').innerText
      }
    });
    console.log('count: ', count);
    await page.close();
    await browser.close();
  } catch (error) {
    console.error(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
})();