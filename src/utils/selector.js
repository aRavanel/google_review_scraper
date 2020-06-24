
// =============================================================
// internal definition
// =============================================================


// =============================================================
// Export
// =============================================================
module.exports = {
  /* list of selectors defined in the module itself */

  // find ? (unused?)
  testEvaluation : () => {

    const nameSelectors = ["span.mw-headline"];
    let providerName = "null";
    nameSelectors.forEach((selector) => {
      const nameSelector = document.querySelector(selector);
      if (!!nameSelector) {
        providerName = nameSelector.innerText;
      }
    });

    tmp = document.querySelector("span.mw-headline");
    providerName = tmp.innerText;
    return providerName;
  },

  // find titles
  find_titles : () => {
    headlines = document.querySelectorAll(".mw-headline"); // retrieve all classes of a type
    const headlines_array = [...headlines]; // put them into an array
    let values = headlines_array.map(h => h.innerText); // take the inner text of each element
    return values
  },

  // find ? (unused?)
  find_ml : () => {
    headlines = document.querySelectorAll("h1.section-hero-header-title-title GLOBAL__gm2-headline-5"); // retrieve all classes of a type
    const headlines_array = [...headlines]; // put them into an array
    let values = headlines_array.map(h => h.innerText); // take the inner text of each element
    return values
  }



};