let auth = (req,res,next) => {

    //인증 처리를 하는곳


    //클라이언트 쿠키에서 토큰을 가져온다.

    let = token = req.cookies.x_auth

    //토큰을 복호화 한후 유저를 찾는다.

    //유저가 있으면 인증 O

    //유저가 없으면 인증 X

}

module.exports = { auth };