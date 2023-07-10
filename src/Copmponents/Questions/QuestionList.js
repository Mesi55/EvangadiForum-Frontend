import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Quesion.css";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import profile from '../../imgs/User.png'
import axios from 'axios'
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
//   const deleteQuestion = async (id) => {
//     try {
//       const response = await axios.delete(
//         `${process.env.REACT_APP_base_url}/user/questions/${id}`
//       );
//       // after deletion, fetch the remaining questions again
//       fetchQuestions();
//     } catch (error) {
//       console.error("Error deleting question:", error);
//     }
//   };

//  // Add update function
// const updateQuestion = async (id) => {
//   // Get the new question data from the user
//   const newQuestion = prompt("Enter the new question");

//   try {
//     const response = await axios.put(
//       `${process.env.REACT_APP_base_url}/user/questions/${id}`,
//       { question: newQuestion }
//     );
//     // after updating, fetch the questions again to reflect the changes
//     fetchQuestions();
//   } catch (error) {
//     console.error("Error updating question:", error);
//   }
// };
  const filteredQuestions = questions.filter((question) =>
  question.question.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className=" mt-5   full-width-container">
    <h1 className="mt-5 ">Questions:</h1>
    <hr />
    {filteredQuestions.map((question, index) => (
      <div key={question.question_id}>
        {/* <h3 style={{color:'red'}}>Asked by: </h3> */}
        <div className="question-container">
          <div className="question-header">
            <img className='avatarStyle'src={profile} alt="Avatar" />
            <h5 className="m-3">{question.user_name}</h5>
          </div>
          {/* {question.user_id === userId && (
              <>
                <button style={{backgroundColor:'black'}} onClick={() => deleteQuestion(question.question_id)}>
                  Delete
                </button>
                <button onClick={() => updateQuestion(question.question_id)}>
                  Update
                </button>
              </>
              )} */}
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
  > <button className="slider-button slider-button-left">
  <ArrowForwardIosSharpIcon className="fs-1" />
</button></Link>
 
</div>

          <h5>Time: {question.time}</h5>
        </div>
        <hr />
      
      </div>
      
    ))}
  </div>
  
  );
};

export default QuestionList;
