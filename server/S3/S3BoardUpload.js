//multer-3 s3
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname +'/awsconfig.json');


const s3 = new aws.S3();
const S3BoardUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ingikbucket/boardImage/'+Date.now(),
        contentType: multerS3.AUTO_CONTENT_TYPE, 
        acl: 'public-read',
        key : function(req, file, cb){
            console.log('upload : '+ JSON.stringify(req.body))
            console.log(req.files)
            const type = file.mimetype.split('/')
            cb(null,Date.now()+'_'+req.body.userName.split('.').pop()+'.'+type[1]); // 이름 설정
            // cb(null, file.originalname)
        },
    }),
    
    
},'NONE');

  module.exports = S3BoardUpload;