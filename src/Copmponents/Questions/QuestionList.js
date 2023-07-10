import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Quesion.css";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import profile from "../../imgs/User.png";

const QuestionList = ({ searchTerm }) => {
  const { userId } = useParams();
  const [questions, setQuestions] = useState([]);
  const id = useParams();
  const { questionId } = useParams();
  useEffect(() => {
    fetchQuestions();
  }, []);

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
  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (time) => {
    const options = {  year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(time).toLocaleString(undefined, options);
  };

  return (
    <div className=" mt-5   full-width-container">
      <h1 className="mt-5 ">Questions:</h1>
      <hr />
      {filteredQuestions.map((question, index) => (
        <div key={question.question_id}>
          {/* <h3 style={{color:'red'}}>Asked by: </h3> */}
          <div className="question-container">
            <div className="question-header">
              <img className="avatarStyle" src={profile} alt="Avatar" />
              <h5 className="m-3">{question.user_name}</h5>
            </div>
            <div className="question-content d-flex justify-content-between align-items-center">
              <Link
                to={`/answers/${question.question_id}`}
                state={{ question }}
                className="links"
                title="Click here to Reply"
              >
                <div className="question-link">
                  <h2 className="question-link">{question.question}</h2>
                </div>
              </Link>
              <Link
                to={`/answers/${question.question_id}`}
                state={{ question }}
                className="links"
                title="Click here to Reply"
              >
                {" "}
                <button className="slider-button slider-button-left">
                  <ArrowForwardIosSharpIcon className="fs-1" />
                </button>
              </Link>
            </div>

            <h6  className="mt-4">Day: {formatTime(question.time)}</h6>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
