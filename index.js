var myLfunc = require('./src/myLambaFunction');

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
    myLfunc.MyLambdaFunction(googleid);

    // end (not useful)
    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true
        })
    };
}

