var selectors = require('../utils/selector');
var google_selectors = require('./google_selectors.js');
var utils = require('../utils/classic_utils.js');
var scrollers = require('../navigation/interactions.js');

// =============================================================
// comment
// =============================================================
// on google chrome console this works : 
// document.querySelector('div.section-layout.section-scrollbox.scrollable-y.scrollable-show')
// document.querySelector('div.section-layout.section-scrollbox.scrollable-y.scrollable-show').scrollBy(0,200)
// document.querySelector('div.section-layout.section-scrollbox.scrollable-y.scrollable-show').scrollTop
// document.getElementsByClassName('section-layout section-scrollbox scrollable-y scrollable-show')[0]
// document.getElementsByClassName('section-layout section-scrollbox scrollable-y scrollable-show')[0].scrollTop
// document.getElementsByClassName('widget-pane-content scrollable-y')[2]
// document.getElementsByClassName('widget-pane-content scrollable-y')[2].offsetHeight
// pane
// document
// window
// document.$x("xxxxxxxxxxxxxxxxxx")
// document.$("xxxxxxxxxxxxxxxxxxxx")
// =============================================================
// data
// =============================================================

// btn number of reviews
var btn1_css = 'button.widget-pane-link';
// var btn1_css = "#pane > div > div.widget-pane-content.scrollable-y > div > div > div.section-hero-header-title > div.section-hero-header-title-description > div.section-hero-header-title-description-container > div > div.gm2-body-2.section-rating-line > span:nth-child(3) > span > span > span:nth-child(2) > span:nth-child(1) > button";
var xpath_button = '//*[@id="app"]/div[13]/div/div[1]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/span[2]/span/span/span[2]/span[1]/button';
var xpath        = '//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[2]/div/div[1]/span[2]/span/span/span[2]/span[1]/button';
var fullxpath = "/html/body/jsl/div[3]/div[9]/div[8]/div/div[1]/div/div/div[2]/div[1]/div[2]/div/div[1]/span[2]/span/span/span[2]/span[1]/button";
var selector1 = "#pane > div > div.widget-pane-content.scrollable-y > div > div > div.section-hero-header-title > div.section-hero-header-title-description > div.section-hero-header-title-description-container > div > div.gm2-body-2.section-rating-line > span:nth-child(3) > span > span > span:nth-child(2) > span:nth-child(1) > button";

// btn all reviews bottom page
var xpathbtn2 = '//*[@id="pane"]/div/div[1]/div/div/div[42]/div/div/button';
var selectorbtn2 = "#pane > div > div.widget-pane-content.scrollable-y > div > div > div:nth-child(42) > div > div > button > span";

//scrollable pane page 1
var xpathpane = '//*[@id="pane"]/div/div[1]/div/div/div[2]';
var scrollable_pane_p1_css_selector ='widget-pane-content scrollable-y';
var scrollable_pane_p1_css_selector ='div.widget-pane-content-holder';

// scrollable pane when clicked all reviews
var scrollable_pane_p2_css_selector = 'div.section-layout.section-scrollbox.scrollable-y.scrollable-show';
var scrollable_pane_p2_class_selector = 'section-layout section-scrollbox scrollable-y scrollable-show';


// =============================================================
// internal functions
// =============================================================


var go_to_page_googleid = async function(googleid, page){
    /* 
    go to the url of the google place id 
    */

    // create url from googleid
    // var url = "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJ4-COh16vyRIR9_nOvFNhLSI";
    var root_url = "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=";
    var url = root_url.concat(googleid);
    
    // go to the url
    try {
        await page.goto(url, {waitUntil: 'networkidle2'});
        console.log("we go to url : ", url);
        console.log('real current url is : ', page._target._targetInfo.url);
    } catch (err) {
        console.log('there is an error : ', err);
        console.log('real current url is : ', page._target._targetInfo.url);
    }
    return page;
}


var scrape_reviews_id = async function (page, googleid) {
    /* 
    scrape google reviews 
    */
    
    //display inner text of btn : real number of reviwes 
    var total_reviews = await scrollers.innerText_css(page, btn1_css);
    total_reviews = total_reviews.replace(/\D/g,'');
    console.log("total_reviews : ", total_reviews);
    console.log(total_reviews < 50);

    // numer of reviews displayed / loaded
    await google_selectors.retrieve_review_number(page);

    // click on button additional reviews
    await scrollers.clickBtn_css(page, selector1); 
    // await scrollers.clickBtn_css(page, selectorbtn2); 
    // await scrollers.clickBtn_xpath(page, xpathbtn2);

    // loop to scroll down until all comments are loaded
    var nr = 0;
    var counter = 0;
    utils.sleep2(2000); // to give time after the clicking
    while (counter < 1000 && nr < total_reviews) {
        try {
            await scrollers.scrollBottom(page, scrollable_pane_p2_css_selector);
            utils.sleep2(100);
            nr = await google_selectors.retrieve_review_number(page);
        } catch (error) {
            console.log("couldnt retrieve reviews");  
        }
        counter++;
        console.log("counter : ", counter, ";    nr : ", nr, "/", total_reviews);
      }

    var data = await google_selectors.get_reviews(page, googleid);
  
    return data;


}

// =============================================================
// Export
// =============================================================
module.exports = {
    
    scrape_reviews : async (page, googleid) => {

        // go to the page specified by google id
        var new_page =  await go_to_page_googleid(googleid, page);
        console.log("new page");

        // retreive reviews
        var  data = await scrape_reviews_id(new_page, googleid);
        console.log("reviews scraped !");

        return data;

    }

}