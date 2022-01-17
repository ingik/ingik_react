const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    Image: String,
    token:{
        type: String
    },
    tokenExp: {
        type: Number
    },
    intro:{
        type: String
    },
    phone:{
        type:String
    }
})

userSchema.pre('save',function( next ){

    var user = this;

    if(user.isModified('password')){
        //비밀번호를 암호화 시킴
        bcrypt.genSalt(saltRounds, function(err,salt){

            if(err) return next(err)

            bcrypt.hash(user.password ,salt,function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }

})

userSchema.methods.comparePassword = function(plainPassword, cb){

    //plainPassword 1234567     암호화된 비밀번호 
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){

    var user = this;

    //jsonwebtoken을 이용해서 token을 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    /* var token = user._id + 'secretToken' = token
    ->> 'secrteToken' -> user._id */

    user.token = token
    user.save(function(err,user){
        if(err) return cb(err);
            cb(null, user);
    })
}

userSchema.statics.findByToken = function( token, cb) {
    
    var user = this;

    //토큰을 decode한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 token과 DB 보관된 token이 일치하는 확인
        user.findOne({"token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)

        })

    })
}

const User = mongoose.model('User', userSchema)
module.exports = { User } 


