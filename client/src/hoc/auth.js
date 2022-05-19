import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
  //< option >
  //null => 아무나 출입이 가능한 페이지
  //true => 로그인한 유저만 출입이 가능한 페이지
  //false => 로그인한 유저는 출입이 불가능한 페이지

  // < adminRoute >
  //admin 컴포넌트

  function AuthenticationCheck(props) {

    const dispatch = useDispatch();

    useEffect(() => {

      dispatch(auth()).then((response) => {
        console.log(
          "(auth)login status : " + JSON.stringify(response.payload.isAuth)
        );

        //로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push({
              pathname: "/login",
              isAuth: response.payload.isAuth,
            });
          }
        } else {
          console.log("login status");

          if (!option) {
            console.log("isLogin");
            props.history.push("/");
          }
        }
      });

      Axios.get("/api/users/auth");

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
