// print out node version
const semver = require('semver');
console.log(process.version);

// =============================================================
// test n1
// =============================================================

// parameters of scraping (googleid)
var event  = {};
var context  = {};
// event["googleid"]  = "ChIJ4-COh16vyRIR9_nOvFNhLSI";
event["googleid"]  = "ChIJyw2Q5IvCzRIRpB_LJDZEhQU";

const index = require("./index.js");
console.log('launch handler');
index.handler(event, context);