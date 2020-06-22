const chromium = require("chrome-aws-lambda");
var selectors = require('./selector');
var pupet = require('./navigation/pupet');
var google_place = require('./google_place/scrape_reviews');

// =============================================================
// Internal function
// =============================================================

 var MyLambdaFunction = async function (googleid) {
 

    try {
        var browser = await pupet.open_browser(); //await permet dattendre que la variable soit evaluee
        var page = await pupet.open_page(browser);
        console.log('page created, lets go scraping...');

        await google_place.scrape_reviews(page, googleid);
        
        // close everything
        if (!!page) {
            await page.close();
            console.log('close page');
        }
        if (!!browser) {
            await browser.close();
            console.log('close browser');
        }

    } catch (err) {
        console.log('there is an error');
        console.log(err);
        // ...handle error
    }
}


// =============================================================
// Main function aws template
// =============================================================

exports.handler = async (event, context) => {
    console.log('in handler');

    // retrieve parameter
    var googleid = null;
    if (event.googleid == null){
        googleid = "ChIJ4-COh16vyRIR9_nOvFNhLSI";
    }else{
        console.log('googleid ', googleid);
        googleid = event["googleid"];
    }
    console.log('googleid ', googleid);
    
    // call scraping function
    MyLambdaFunction (googleid);

    // end (not useful)
    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true
        })
    };
}



