
import { UserContext } from "./Copmponents/contexts/UserContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SignUP from "./Copmponents/signup/SignUP";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import Home from "./Copmponents/pages/Homepages/Home";
import { Card, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./Copmponents/login/LoginPage";
import QuesionForm from "./Copmponents/Questions/QuesionForm";
import Header from "./Copmponents/pages/Homepages/Header";
import AnswerForm from "./Copmponents/Answers/AnswerForm";
import Footer from "./Copmponents/Footer/Footer";
import ForgotPassword from "./passwordReset/ForgotPassword";
import PageNotFound from "./Copmponents/pages/PageNotFound/PageNotFound";
import Logoutnotfictions from "./Copmponents/login/Logoutnotfictions";
import Otp from "./passwordReset/OTP";

function App() {
  const [questions, setQuestions] = useState([]);
  const { userData, setUserData } = useContext(UserContext);
  const checkLogin = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      try {
        const userRes = await axios.get(`${process.env.REACT_APP_base_url}/user`, {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: {
            id: userRes.data.data.user_id,
            display_name: userRes.data.data.user_name,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const signOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", ""); // Clear token from localStorage
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const { questionId } = useParams();

  return (
    <>
      <Router>
        <Header signOut={signOut} />
        <Container>
          <div style={{ flex: 1 }} className="App">

            <Routes>
              <Route path="/signup" element={<SignUP />} />
              <Route path="/login" element={<LoginPage />} />
              <Route exact path="/forgotPass/:email" element={<Otp/>} />
              <Route path="/answers/:questionId"
                element={<AnswerForm questionId={questionId} />}/>
              <Route path="/questions" element={<QuesionForm />} />
              <Route path="/" element={<Home questions={questions} />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </Container>
        <Footer />
      </Router>
    </>
  );
}
export default App;
