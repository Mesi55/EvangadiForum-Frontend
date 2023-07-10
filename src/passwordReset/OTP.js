import React, { useState, useContext } from "react";
import axios from "axios";
import NewPassword from "./ResetPassword";
import { userEmail } from "./ForgotPassword";
import { Link, useParams } from "react-router-dom";
import Cookie from "universal-cookie";
export const emailForNewPass = React.createContext();
function Otp() {
  const { email } = useParams();

  const EncrypedEmail = email;

  const [forOtp, setForOTP] = useState({
    OTP: "",
    EncrypedEmail,
  });
  const [response, setresponse] = useState();
  let urlOfOTP = `${process.env.REACT_APP_base_url}/user/ForNewPasswordOTP`;
  let OTPset = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: urlOfOTP,
      data: forOtp,
    }).then((res) => {
      setresponse(res.data);
    });
  };

  let handelChangeOTP = (e) => {
    switch (e.target.name) {
      case "OTP":
        setForOTP((pre) => {
          return { ...pre, OTP: e.target.value };
        });
        break;
      default:
        break;
    }
  };

  if (response) {
    if (response.confirmation === "true") {
      return (
        <emailForNewPass.Provider value={forOtp.email_OTP}>
          <NewPassword />
        </emailForNewPass.Provider>
      );

      // return <h1>hi</h1>
    } else {
      return (
        <div className="pageNotFound forSuccessPa  ">
          <h1 className="thankYou">{response.message}</h1>
          <Link className="thankYouAnch" to={`${response.redirect}`}>
            {response.redirectMessage}
          </Link>
        </div>
      );
    }
  } else {
    return (
      <div className="login-container ">
          <div className=" login-content">
            <p className="login-text">Please enter the four digt number sent to your email?</p>
            <form onSubmit={OTPset}className="login-form">
          
              <input
               className="email-input"
                type="text"
                name="OTP"
                placeholder="Please pass your four digit OTP here..."
                required
                autoComplete="new-password"
                onChange={handelChangeOTP}
              />
               <button className="submit-button">Submit</button>
            </form>
          </div>
        </div>
    );
  }
}

export default Otp;

