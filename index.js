const chromium = require("chrome-aws-lambda");


exports.handler = async (event, context) => {

     try {
        const browser = await chromium.puppeteer.launch({
            headless: true,
            executablePath: await chromium.executablePath,
            args: chromium.args
        });

        const page = await browser.newPage();
        await page.goto("https://google.com");
        console.log('we are in !!!');
        // ...do something, screenshot etc

        await browser.close();
    } catch (err) {
        console.log('there is an error');
        console.log(err);
        // ...handle error
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true
        })
    };
}
