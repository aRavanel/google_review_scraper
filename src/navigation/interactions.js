// ====================================
// clicks
// =====================================
async function clickBtn_css(page, css_selector) {
    console.log("lets click !");
    try {
        var b = await page.$(css_selector);
        await b.evaluate( b => b.click() );
        console.log('btn clicked !, real current url is : ', page._target._targetInfo.url);
    } catch (error) {
        console.log('error');
    }
}

async function clickBtn_xpath(page, xpath_selector) {
    console.log("lets click !");
    try {
        var b = await page.$x(xpath_selector);
        await b.evaluate( b => b.click() );
        console.log('btn clicked !, real current url is : ', page._target._targetInfo.url);
    } catch (error) {
        console.log('error');
    }
}


// ====================================
// INNER TEXT
// =====================================
async function innerText_css(page, css_selector) {
    /* 
    click on object with a css_selector 
    */

    // v1
    // let click_object = await page.$(css_selector).innerText;

    // v2
    let innerText = await page.evaluate((css_selector) => {
        let text = document.querySelector(css_selector).innerText;
        return text;
    }, css_selector );
    console.log('object innerText :', innerText);
    return innerText;
}

// ====================================
// ?
// =====================================
// elemnts return must be json ser
// sel = "#pane > div > div.widget-pane-content.scrollable-y > div > div > div.section-hero-header-title > div.section-hero-header-title-description > div.section-hero-header-title-description-container > div > div.gm2-body-2.section-rating-line > span:nth-child(3) > span > span > span:nth-child(2) > span:nth-child(1) > button";
// let btn = await page.evaluate(() => {
//     let sel = 'button.widget-pane-link';
//     // let sel = "#pane > div > div.widget-pane-content.scrollable-y > div > div > div.section-hero-header-title > div.section-hero-header-title-description > div.section-hero-header-title-description-container > div > div.gm2-body-2.section-rating-line > span:nth-child(3) > span > span > span:nth-child(2) > span:nth-child(1) > button";
//     let btn = document.querySelector(sel);
//     return {
//         babar : document.querySelector(sel).href
//     }
// });
// console.log('btn :', btn);

// await this.page.evaluate((sel) => {
//     let elements = Array.from(document.querySelectorAll(sel));
//     let links = elements.map(element => {
//         return element.href
//     })
//     return links;
// }, sel);
// console.log(this.page);


// ====================================
// SCROLL
// =====================================

// -----------------------------------------------------------------------------
// https://towardsdatascience.com/scraping-google-maps-reviews-in-python-2b153c655fc2
// var scrollable_div = document.querySelector('div.section-layout.section-scrollbox.scrollable-y.scrollable-show');
            
// driver.execute_script(
//                'arguments[0].scrollTop = arguments[0].scrollHeight', 
//                 scrollable_div
//                )
// -----------------------------------------------------------------------------

async function capture(page) {
    /* UNUSED */
    /* scroll function (works for a window) */

    // export default async function capture(browser, url) {
        // Load the specified page
        // const page = await browser.newPage();
        // await page.goto(url, {waitUntil: 'load'});
    
        console.log(" in capture ");
        
        // Get the height of the rendered page
        const bodyHandle = await page.$('body');
        const { height } = await bodyHandle.boundingBox();
    
        // ar
        // var xpathpane = '//*[@id="pane"]/div/div[1]/div/div/div[2]';
        // const bodyHandle = await page.$x(xpathpane);
        // const { height } = 500;
        // ----
        await bodyHandle.dispose();
      
        // Scroll one viewport at a time, pausing to let content load
        const viewportHeight = page.viewport().height;
        let viewportIncr = 0;
        while (viewportIncr + viewportHeight < 6*height) {
            console.log("viewportIncr : ", viewportIncr); //4* is a test
            await page.evaluate(_viewportHeight => {
                window.scrollBy(0, _viewportHeight);
            }, viewportHeight);
            await utils.wait(200);
            viewportIncr = viewportIncr + viewportHeight;
            }
      
        // Scroll back to top
        await page.evaluate(_ => {
          window.scrollTo(0, 0);
        });
    }


// -----------------------------------------------------------------------------
// infinite scroll (working ?) (UNUSED)
// https://github.com/intoli/intoli-article-materials/blob/master/articles/scrape-infinite-scroll/scrape-infinite-scroll.js
// usage : scrapeInfiniteScrollItems(page, extractItems, 100);

  function extractItems() {
    const extractedElements = document.querySelectorAll('#boxes > div.box');
    const items = [];
    for (let element of extractedElements) {
      items.push(element.innerText);
    }
    return items;
  }
  
  /**
   * Scrolls and extracts content from a page.
   * @param {object} page - A loaded Puppeteer Page instance.
   * @param {function} extractItems - Item extraction function that is injected into the page.
   * @param {number} itemTargetConut - The target number of items to extract before stopping.
   * @param {number} scrollDelay - The time (in milliseconds) to wait between scrolls.
   */
  async function scrapeInfiniteScrollItems(page, extractItems, itemTargetCount, scrollDelay = 1000) {
    let items = [];
    try {
      let previousHeight;
      while (items.length < itemTargetCount) {
        items = await page.evaluate(extractItems);
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await page.waitFor(scrollDelay);
      }
    } catch(e) { }
    return items;
  }
// -----------------------------------------------------------------------------
async function autoScroll(page){
    /* 
    scroll down the main window till the end 
    (UNUSED) 
    */
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;

            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
            
                window.scrollBy(0, distance);
                totalHeight += distance;
                console.log("totalHeight : ", totalHeight);

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 400);
        });
    });
}

async function autoScrollar(page){
    console.log(" in autoScroll ");
    /*
    scroll down till the end 
    (UNUSED)
    */
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;

            var timer = setInterval(() => {
   
                // ar
                // var pane = document.querySelector('div.widget-pane-content-holder');
                // var elem_pane = document.getElementsByClassName('widget-pane-content scrollable-y')[2];
                // elem_pane.scrollTop = elem_pane.scrollTop + 400;

                // var elem_pane = document.getElementsByClassName('section-layout section-scrollbox scrollable-y scrollable-show')[0];
                // elem_pane.scrollTop = 8000;
                // pane.scrollBy(0, distance);

                // ---

                // ar
                try {
                    // var elem_pane = document.getElementsByClassName('section-layout section-scrollbox scrollable-y scrollable-show')[0];
                    var elem_pane = document.querySelector('div.section-layout.section-scrollbox.scrollable-y.scrollable-show');
                    // 
                    console.log(elem_pane.scrollTop);
                    elem_pane.scrollTop = 8000;
                } catch (error) {
                    console.log('scroll didnt work');
                }
                // --------

                window.scrollBy(0, distance);
                totalHeight += distance;
                console.log("totalHeight : ", totalHeight);

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 400);
        });
    });
}


// -----------------------------------------------------------------------------
async function scrollBottom(page, css_selector){
    /* 
    go to the bottom of the page. note if number is too big, it is thresholded 

    note passing an arge to page.evaluate is a bit messy :
    https://stackoverflow.com/questions/46088351/puppeteer-pass-variable-in-evaluate
    */

    let val = await page.evaluate(
        async (css_selector) => {
            var elem_pane = document.querySelector(css_selector);
            var height = elem_pane.scrollHeight;
            const enormousNumber = 99999999999;
            elem_pane.scrollTop = enormousNumber; // try to assign, will be thresholded by navigator
            return {
                current_top : elem_pane.scrollTop,
                current_height : height
            }
        }, 
        css_selector); // this line ist to give css selector as arg

    // console.log("scroll top / height : ", val) // curent value of scroll
}

// -----------------------------------------------------------------------------
// on page 
// document.getElementsByClassName('widget-pane-content scrollable-y')[2].scrollTop = document.getElementsByClassName('widget-pane-content scrollable-y')[2].offsetHeight +
// div.widget-pane-content.scrollable-y

// https://stackoverflow.com/questions/52030394/how-to-scroll-inside-a-div-with-puppeteer;
// const scrollable_section = '.section-listbox .section-listbox';
// await page.waitForSelector('.section-listbox .section-listbox > .section-listbox');
// await page.evaluate(selector => {
//   const scrollableSection = document.querySelector(selector);
//   scrollableSection.scrollTop = scrollableSection.offsetHeight;
// }, scrollable_section);

// const scrollable_section = 'div.section-layout.section-scrollbox.scrollable-y.scrollable-show';
// const scrollable_section = 'div.widget-pane-content.scrollable-y';
    
// -----------------------------------------------------------------------------


// =============================================================
// EXPORT
// =============================================================
module.exports = {
    capture
    , scrollBottom
    , innerText_css
    , clickBtn_css
    , clickBtn_xpath
}