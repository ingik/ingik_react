//multer-3 s3
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
// aws.config.loadFromPath(__dirname +'/awsconfig.json');

const s3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region 
});

let serverLocation 

if(process.NODE_ENV === 'production'){
    
} else if(process.NODE_ENV === 'qa') {
    serverLocation = 'profileImage_QA/'
} else {
    serverLocation = 'profileImage/'
}



async function imageDelete(data) {

  try{
  const type = data.split('/')
  let splitData = serverLocation + type[4];
  console.log('Delete File Key : ' + splitData)

  const params = {
    Bucket: "ingikbucket",
    Key: splitData,
  };
  
   return await s3.deleteObject(params ,(err, data) => {
      if (err) return console.log('s3 deleteObject error')
      return console.log('s3 deleteObject ' + data)
    }).promise();
  } catch(err){
     return console.log(err)
  }
}


module.exports = imageDelete;
