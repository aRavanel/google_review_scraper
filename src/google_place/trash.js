    // var url = "https://www.google.com/maps/place/Canoe+Kayak+Raids,+Avenue+de+Saint-Jean,+13600+La+Ciotat,+France/@43.1869945,5.6274214,16z/data=!4m2!3m1!1s0x12c9af5e878ee0e3:0x222d6153bccef9f7";
    // var url = "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal";
    
    
    // =================================
    // Click on a button
    // ===========================
    
    
    // const res = await page.goto(url, {waitUntil: 'networkidle2'});
    
    // display html
    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    // console.log(bodyHTML);

    // test
    console.log(await page.evaluate(selectors.find_ml));

    // test
    try {
        let selector_reviews = selector1;
        await page.click(selector_reviews)
    } catch (error) {
        console.log("error");
    }
    await page.waitForSelector('button.jqnFjrOWMVU__button.gm2-caption', {visible: true});
    bodyHTML = await page.evaluate(() => document.bodyHTML);
    console.log(bodyHTML);
    let nb = await page.$('button.jqnFjrOWMVU__button.gm2-caption');
    console.log('hola ',nb.innerHTML);

    // test
    try {
        // xpath_reviews = "/html/body[@class='keynav-mode-off highres screen-mode']/jsl/div[@id='app-container']/div[@id='content-container']/div[@id='pane']/div[@class='widget-pane widget-pane-visible']/div[@class='widget-pane-content scrollable-y scrollable-show']/div[@class='widget-pane-content-holder']/div[@class='section-layout section-layout-root']/div[@class='section-hero-header-title']/div[@class='section-hero-header-title-description']/div[@class='section-hero-header-title-description-container']/div[@class='section-rating']/div[@class='gm2-body-2 section-rating-line']/span[2]/span[@class='section-rating-term-list']/span[@class='section-rating-term']/span[2]/span[1]/button[@class='widget-pane-link']"
        console.log(await page.$x('//*[@id="app"]/div[13]/div/div[1]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/span[2]/span/span/span[2]/span[1]/button'));
        
        const f = (await page.$x(xpath_button))[0];
        console.log(f);

        // // await page.$x(xpath_reviews)
        const elements = await page.$x(xpath_button);
        console.log("select xpath to click");
        console.log(elements);
        await elements[0].click() ;
        console.log("clicked on number of reviews");
    } catch (error) {
        console.log("error");
    }

    // test
    try {
        const f2 = document
                .evaluate(
                    xpath_button,
                    document,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                )
                .singleNodeValue;
        console.log(f2);        
    } catch (error) {
        
    }

    // test
    try {
        
        console.log(await page.$x(xpath_span));
    } catch (error) {
        console.log("error");
    }

    // test
    try {
        let selector_reviews = "#pane > div > div.widget-pane-content.scrollable-y > div > div > div.section-hero-header-title > div.section-hero-header-title-description > div.section-hero-header-title-description-container > div > div.gm2-body-2.section-rating-line > span:nth-child(3) > span > span > span:nth-child(2) > span:nth-child(1) > button";
        await page.click(selector_reviews)
    } catch (error) {
        console.log("error");
    }

    // test
    // jsaction="pane.rating.moreReviews";

    try {
        
        await page.click(fullxpath);
    } catch (error) {
        console.log("error page.click(fullxpath)");
    }

    try {
        await page.click(xpath);
    } catch (error) {
        console.log("error page.click(xpath)") ;
    }






    // // v6
    // // document
    //     const textContent = await page.evaluate(() => {
    //         return document.querySelector("#pane > div > div.widget-pane-content.scrollable-y > div > div > div.section-hero-header-title > div.section-hero-header-title-description > div.section-hero-header-title-description-container > div > div.gm2-body-2.section-rating-line > span:nth-child(3) > span > span > span:nth-child(2) > span:nth-child(1) > button");
    //     });
    //     console.log(textContent);

    // v7
    // console.log("lets find the button");
    // const textContent = await page.evaluate(() => {
    //     let selector = "span";
    //     // let selector = "span.widget-pane-link";
    //     console.log(document.querySelectorAll("span"));
    //     var selcted = document.querySelectorAll(selector);

    //     return selcted;
    //     });
    // console.log(textContent)
        


    // ==================================================
    // ==================================================
    // scroll pannel to the bottom to load all reviews
    await autoScroll(page);
    console.log("finished to scroll down");



        // retrieve all reviews
        const reviews = await page.evaluate(() => {
            return document.querySelector(".section-review-content");
        });
        const reviews_array = [...reviews]; // put them into an array
        console.log("saving reviews");
    
        // take their inner text
        let values_array = reviews_array.map(h => h.innerText); // take the inner text of each element
        console.log("saving review contents");