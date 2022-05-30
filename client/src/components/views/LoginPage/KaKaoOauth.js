import React from "react";
import { Link } from "react-router-dom";

function KaKaoOauth() {
  const REST_API_KEY = KAKAO_KEY;
  const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
//   const KAKAO_OAUTH = 
//   'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id='+REST_API_KEY+'&redirect_uri='+REDIRECT_URI;
  const KAKAO_OAUTH = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`

  return (
    <button>
      <Link to={KAKAO_OAUTH}>로그인</Link>
    </button>
  );
}

export default KaKaoOauth;
