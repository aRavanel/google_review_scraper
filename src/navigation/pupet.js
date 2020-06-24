
const DEFAULT_TIMEOUT = 2000;

// =============================================================
// internal functions
// =============================================================
var open_browser_private = async function () {
    // https://bitsofco.de/how-to-use-puppeteer-in-a-netlify-aws-lambda-function/
    
    const chromium = require("chrome-aws-lambda");
    const puppeteer = require('puppeteer-core'); // not necessary



    let browser = null;
    let page = null;

    try {
        console.log('lets open a navigator!');
          // console.log('lets open a navigator!');
        // // browser = await chromium.puppeteer.launch({
        // //     args: [
        // //       "--lang=fr-FR,fr",
        // //       "--disable-dev-shm-usage",
        // //       "--disable-gpu",
        // //       "--single-process",
        // //       "--no-zygote",
        // //       "--no-sandbox",
        // //       "--disable-setuid-sandbox",
        // //       "--no-first-run"
        // //     ],
        // //     defaultViewport: chromium.defaultViewport,
        // //     executablePath: await chromium.executablePath,
        // //     headless: chromium.headless,
        // //   });
        // // browser = await chromium.puppeteer.launch({
        // //     headless: true,
        // //     executablePath: await chromium.executablePath,
        // //     args: chromium.args
        // // });
        // browser = await chromium.puppeteer.launch({
        //   headless: true,
        //   args: [
        //     //       "--lang=fr-FR,fr",
        //     //       "--disable-dev-shm-usage",
        //     //       "--disable-gpu",
        //     //       "--single-process",
        //     //       "--no-zygote",
        //           "--no-sandbox"
        //     //       "--disable-setuid-sandbox",
        //     //       "--no-first-run"
        //         ],
        // });

        // for aws
        // ----------


        try {

            //     browser = await chromium.puppeteer.launch({
                //         args: chromium.args,
                //         defaultViewport: chromium.defaultViewport,
                //         executablePath: await chromium.executablePath,
                //         headless: chromium.headless,
                //         ignoreHTTPSErrors: true,
                //       });

            let headless = chromium.headless;
            console.log("headless ? : ", headless);
            console.log(" chromium.executablePath ? : ",  chromium.executablePath);
            console.log(" chromium.args ? : ",  chromium.args);

            // browser = await chromium.puppeteer.launch({
            // // browser = await puppeteer.launch({
            //     args: chromium.args,
            //     executablePath: await chromium.executablePath,
            //     defaultViewport ,
            //     headless: true,
            //     ignoreHTTPSErrors: true
            //   });

            browser = await chromium.puppeteer.launch({
            headless: true,
            args: [
              //       "--lang=fr-FR,fr",
                    // "--disable-dev-shm-usage",
                    "--disable-gpu",
                    "--single-process",
              //       "--no-zygote",
                    "--no-sandbox"
              //       "--disable-setuid-sandbox",
              //       "--no-first-run"
                  ]
          });


              console.log('open browser for aws');
        } catch (error) {
            console.log('error browser not opened for aws');
            
        }

      

        
        
        // for local
        // ---------
        // browser = await chromium.puppeteer.launch({
        //   headless: true,
        //   args: [
        //     //       "--lang=fr-FR,fr",
        //     //       "--disable-dev-shm-usage",
        //     //       "--disable-gpu",
        //     //       "--single-process",
        //     //       "--no-zygote",
        //           "--no-sandbox"
        //     //       "--disable-setuid-sandbox",
        //     //       "--no-first-run"
        //         ]
        // });

    } catch (err) {
        console.log('there is an error');
        console.log(err);
        // ...handle error
    }

    return browser;
}



var open_page_private = async function (browser) {
    /* lets open a page */
    let page = null;
    try {
        page = await browser.newPage();
    } catch (err) {
        console.log('there is an error');
        console.log(err);
    }
    return page;
}

// =============================================================
// exported functions
// =============================================================

module.exports = {
    
    open_browser : async () => {
        /* open up a browser */
        var browser = await open_browser_private();
        return browser;
    },

    open_page : async (browser) => {
        /* open up  a page */
        var page = await open_page_private(browser);
        return page;
    }

}


