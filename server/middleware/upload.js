//multer-3 s3
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname +'/awsconfig.json');


const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ingikbucket/profileImage',
        contentType: multerS3.AUTO_CONTENT_TYPE, 
        acl: 'public-read',
        key : function(req, file, cb){

            const type = file.mimetype.split('/')
                cb(null, req.body.stringData.split('.').pop()+'.'+type[1]); // 이름 설정
                console.log('upload : '+file)
                // cb(null, file.originalname)
        }
    })
},'NONE');
module.exports = upload;