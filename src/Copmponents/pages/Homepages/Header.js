import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./homepage.css";
import { UserContext } from "../../contexts/UserContext";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../../imgs/evangadi-logo-home.png";
function Header({ signOut }) {
  const [route, setRoute] = useState("Sign Up");
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [display, setDisplay] = useState(userData ? "logout" : "Sign Up");
  function clickHandler() {
    if (display === "Sign Up") {
      setDisplay("logout");
      navigate("/login");
    } else {
      setDisplay("Sign Up");
      navigate("/signup");
    }
    if (display === "logout") {
      signOut();
    }
  }
  return (
    <div className="header container-fluid mx-sm-5">
      <div className="innerContainer container d-flex justify-content-around ">
        <div className="header__image">
          <a href="/">
            <img src={logo} alt="Evangadi logo" />
          </a>
        </div>
        <Navbar bg="light" expand="lg">
          <Container fluid >
            
            {/* <Navbar.Brand href="#">Home </Navbar.Brand> */}
            <Navbar.Toggle aria-controls="navbarScroll " className="mx-5" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className=" my-md-3 my-sm-0 my-lg-0"
               
                navbarScroll
              >
                <Nav.Link href="/" className=" me-md-2 me-sm-0 my-md-3 my-sm-0">
                  <strong>Home</strong>
                </Nav.Link>

                <Nav.Link href="/home" className="me-md-3 me-sm-0 my-md-3 my-sm-0">
                  <strong>How It Works</strong>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Nav.Link to={`/${route}`} onClick={clickHandler}>
                  <strong>
                    {" "}
                    <div className="innerContainer2 ">
                      <a
                        to={`/${route}`}
                        onClick={clickHandler}
                        className="loginHeader"
                      >
                        {display}{" "}
                      </a>
                    </div>
                  </strong>
                </Nav.Link>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
