var pupet = require('./navigation/pupet');
var aws = require('./utils/aws_utils');
var google_place = require('./google_place/scrape_reviews');

// =============================================================
// Internal function
// =============================================================

 var MyLambdaFunction = async function (googleid) {
 
    try {
        var browser = await pupet.open_browser(); //await permet dattendre que la variable soit evaluee
        var page = await pupet.open_page(browser);
        console.log('page created, lets go scraping...');
        var review_data = await google_place.scrape_reviews(page, googleid);
        console.log('review_data : ', review_data);
        
        // store in aws
        aws.deployToAWS(googleid, review_data);

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
// Export 
// =============================================================
module.exports = {
    MyLambdaFunction:MyLambdaFunction
}



