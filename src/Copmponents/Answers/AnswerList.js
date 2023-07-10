import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AnswerList.css";
import Likes from "../pages/Comments/Likes";
import profile from '../../imgs/User.png'
const AnswerList = () => {
  const [answers, setAnswers] = useState([]);
  const { questionId } = useParams();

  useEffect(() => {
    fetchAnswers();
  }, []);
//? fetch answers by quesion id and post on the page
  const fetchAnswers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_base_url}/user/answers/${questionId}`
      );
      const data = await response.json();
      setAnswers(data);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };
  const avatarStyle = {
    width: '80px', 
    height: '80px',
    borderRadius: '50%', 
    border: '1px solid #333',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', 
    backgroundColor: 'gray',
  };

//* filer answers by question id
//? By using parseInt() on the questionId, it ensures that the comparison is done between two values of the same type, allowing the filter() function to correctly filter the answers array based on the matching question_id.
  const filteredAnswers = answers.filter(
    (answer) => answer.question_id === parseInt(questionId)
  );
  return (
    <div className="mx-5">
     
      {filteredAnswers.length === 0 ? (
        <p>There is no answer for the question yet!</p>
      ) : (
        filteredAnswers.map((answer) => (
          <div key={answer.answer_id} className="answer-container">
            <div className="answer-header">
            <img style={avatarStyle} src={profile} alt="Avatar" />{answer.time}
            <h5 className="answer-user mx-3"> {answer.user_name}</h5>
            </div>
            <h2 className="answer-text">{answer.answer}</h2>
            <p> ON: {answer.answer_time}</p>
            <Likes answer={answer} />
          </div>
        ))
      )}
    </div>
  );
};

export default AnswerList;
