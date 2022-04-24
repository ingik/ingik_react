require("dotenv").config();

console.log('NODE_ENV : '+process.env.NODE_ENV)
if(process.env.NODE_ENV === 'production'){
    console.log('connect mongoDB PROD')
    module.exports = require('./prod');
} else if(process.env.NODE_ENV === 'qa') {
    console.log('connect mongoDB QA')
    module.exports = require('./qa');
} else {
    console.log('connect mongoDB DEV')
    module.exports = require('./dev');
}