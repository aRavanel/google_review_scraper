// =============================================================
//  functions
// =============================================================
async function retrieve_review_number(page){
    /* 
    retrieve real number of reviews displayed on page 
    */
    let nr = await page.evaluate(
        () => {
            // .section-review
            // .ripple-container
            let reviews = document.querySelectorAll('.section-review');
            const headlines_array = [...reviews]; // put them into an array
            let values = headlines_array.map(h => h.innerText); // take the inner text of each element
            return values.length;
        }
    );
    console.log('number of reviews :', nr);
    return nr;
}


async function get_reviews(page, googleid){
    /* 
    retrieve real number of reviews displayed on page 
    */
   let data = await page.evaluate(
    (googleid) => {

        // general
        let mean_grade = document.querySelectorAll('.gm2-display-2')[0].innerText;

        // for each review
        let review_sections = document.querySelectorAll('.section-review');
        const review_sections_array = [...review_sections]; // put them into an array
        let reviews = review_sections_array.map(h => h.querySelector('.section-review-text').innerText); // take the inner text of each element
        let dates = review_sections_array.map(h => h.querySelector('.section-review-publish-date').innerText); // take the inner text of each element
        let stars = review_sections_array.map(h => h.querySelector('.section-review-stars').ariaLabel);
        
        // v1 big dict of array
        // var data_ = {};
        // data_['mean_grade'] = mean_grade;
        // data_['reviews'] = reviews;
        // data_['dates'] = dates;
        // data_['stars'] = stars;

        //v2 transform into an array of dict
        var data_= new Array();
        var i;
        for (i = 0; i < reviews.length; i++) {
            let subDict = {};
            subDict['review_id'] = i;
            subDict['googleid'] = googleid;
            subDict['mean_grade'] = mean_grade[i];
            subDict['review'] = reviews[i];
            subDict['date'] = dates[i];
            subDict['stars'] = stars[i];
	        data_.push(subDict);
        }
        return data_;
    }, googleid);

    // console.log('data :', data);
    return data;
}


// =============================================================
// EXPORT
// =============================================================
module.exports = {
    retrieve_review_number
    ,get_reviews
}