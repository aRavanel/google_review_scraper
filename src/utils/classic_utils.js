

function wait (ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function sleep2(milliseconds) {
    /* blockin sleep by doing a loop*/
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

module.exports = { wait, sleep, sleep2 }; // nb export keyword before function need es6 / babel