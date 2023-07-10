import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QuestionList from "../../Questions/QuestionList";
import "./Home.css";
import Logoutnotfictions from "../../login/Logoutnotfictions";
const Home = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_base_url}/user/questions`
      );
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (!userData.user) navigate("/login");
    fetchQuestions();
  }, [userData.user, navigate]);
  return (
    <div className="mx-md-5 mt-3">
      <div className="d-flex home-page mx-md-3 my-md-2">
        <div className="ask">
          <button type="" className="linkss">
            {" "}
            <Link to="questions" className="link">
              <h3 className="mx-1" title="click here to ask">
                Ask Questions
              </h3>
            </Link>
          </button>
        </div>
        <div className="welcome">
          <h4 className=" ">Welcome: {userData.user?.display_name}</h4>
        </div>
      </div>

      <div className="search-input ">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search questions..."
        />
      </div>

      <div className="queisonslist">
        <QuestionList searchTerm={searchTerm} />
      </div>

      <hr />
    </div>
  );
};

export default Home;
