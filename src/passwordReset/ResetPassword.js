import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./forgot.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [emailResponse, setemailResponse] = useState();
  const [password, setPassword] = useState("");

  const { email } = useParams();
  const EncrypedEmail = email;

  const [newEmail, setNewEmail] = useState({
    new_password_one: "",
    new_password_two: "",
    EncrypedEmail,
  });

  let newPass = (e) => {
    e.preventDefault();
    if (newEmail.new_password_one === newEmail.new_password_two) {
      let url = `${process.env.REACT_APP_base_url}/user/setNewPassword`;
      axios({
        method: "post",
        url,
        data: newEmail,
      })
        .then((data) => {
          // console.log(data);
          // console.log(newEmail);
          setemailResponse(data.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      return setemailResponse({
        successMessage: "Passwords Doesn't Match Please Try Again",
        redirect: "/logIn",
        message: "Click Here To Go Back To LogIn  Page",
      });
    }
  };
  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "passwordConfirm") {
      setShowPasswordConfirm(!showPasswordConfirm);
    }
  };
  const handlePaste = (event) => {
    event.preventDefault();
    setPassword("");
  };
  let handle_change = (e) => {
    switch (e.target.name) {
      case "new_password_one":
        setNewEmail((pre) => {
          return { ...pre, new_password_one: e.target.value };
        });
        break;
      case "new_password_two":
        setNewEmail((pre) => {
          return { ...pre, new_password_two: e.target.value };
        });
        break;
      default:
        break;
    }
  };

  if (emailResponse) {
    return (
      <div className="pageNotFound my-5 py-5">
        <h1 className="thankYou">{emailResponse.successMessage}</h1>
        <a className="thankYouAnch" href={`${emailResponse.redirect}`}>
          {emailResponse.message}
        </a>
      </div>
    );
  } else {
    return (
      <div className="login-container">
        <div className=" login-content ">
          <p className="login-text">
            Reset Your Password <br />
            You Want To LogIn?
            <Link to="/login" className="a3">
              {" "}
              <br />
              Click Here To LogIn
            </Link>
          </p>
          <form onSubmit={newPass}>
            <input
              className="email-input"
              type={showPassword ? "text" : "password"}
              name="new_password_one"
              placeholder="New Password"
              required
              autoComplete="new-password"
              onChange={handle_change}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="password-toggl"
              onClick={() => handleTogglePassword("password")}
            />
            <br />
            <input
              className="email-input"
              type={showPassword ? "text" : "password"}
              onPaste={handlePaste}
              name="new_password_two"
              placeholder="Confirm Password"
              required
              autoComplete="new-password"
              onChange={handle_change}
            />
            <br />
            <button className="submit-button">Reset Password</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewPassword;
