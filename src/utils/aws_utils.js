const AWS = require('aws-sdk');


// =============================================================
// Internal function
// =============================================================

async function deployToAWS(googleid, review_data) {
  /* 
  store data in AWS
  */
  console.log("lets store data into aws");
  // const s3 = new AWS.S3({region: 'eu-west-1'});
  const s3 = new AWS.S3();
  // const basePath = `googleplace/reviews/${event.key}`;
  const basePath = `googleplace/reviews`;
  const deployed = await deployToS3(s3, googleid, basePath, review_data);

  // if(deployed.statusCode) {
  //   const response = {
  //       statusCode: deployed.statusCode,
  //       body: `Internal error occurred: ${deployed.message}`,
  //   };
  //   return context.fail(response);
  // } else {
  //     const response = {
  //         statusCode: deployed.statusCode,
  //         body: review_data,
  //     };
  //     return context.succeed(response);
  // }

}


async function deployToS3(s3, googleid, basePath, review_data) {
  /* 
  put data into a s3 bucket 
  */
  console.log("lets store data into s3");
  // const bucket = `adbuddy-art-tmp/${basePath}`;
  const bucket = `sherpa-data/${basePath}`;
  const filename = `${googleid}-reviews.json`;
  console.log("filename : ", filename);
  try {
    const destination = {
      Bucket: bucket,
      Key: filename,
      Body: JSON.stringify(review_data)
  };
    const s3Result = await s3.putObject(destination).promise();
    return s3Result;
  } catch (error) {
      console.error(error);
    return error;
  }
}


// =============================================================
// Export (nb export keyword before function need es6 / babel)
// =============================================================
module.exports = { 
  deployToAWS
}; 
