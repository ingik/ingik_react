if(process.NODE_ENV === 'production'){
    module.exports = require('./prod');
} else if(process.NODE_ENV === 'qa') {
    module.exports = require('./qa');
} else {
    module.exports = require('./dev');
}