import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  Form,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import "./Answers.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

import AnswerList from "./AnswerList";
const AnswerForm = (props) => {
  const [answer, setAnswer] = useState([]);
  const id = useParams();
  const { userData, setUserData } = useContext(UserContext);
  const location = useLocation();
  const { question } = location.state;
  const { questionId } = useParams();
  const [answers, setAnswers] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const strippedAnswer = answer.replace(/<[^>]+>/g, "");
    const answerData = {
      answer: strippedAnswer,
      userId: userData?.user?.id,
      questionId,
      time: new Date(),
    };
  
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_base_url}/user/answers/${questionId}`,
        answerData
      );
      const newAnswer = res.data;
      setAnswer("");
      window.location.reload(false);
      // Answer created successfully
      console.log("Answer created:", newAnswer);
    } catch (error) {
      // Handle error
      console.error("Error creating answer:", error);
    }
  };
  

  
  return (
<>
  <Container fluid className="main_answer-wraper ">
    <Row className="mx-md-5">
      <Col md={6} sm={8} xs={8} className="asners mt-5 ">
<h2 className="mt-5 pt-4 mt-md-0 pt-md-0"> Question:</h2>
<hr /> 
        <h4>{question.question}</h4>
        <h5>{question.question_description}</h5>
        <hr />
      </Col>
    </Row>
    <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>
  Answer From The Community
</h2>

    <hr />
    <Row>
    <Col md={6} sm={8} xs={8} className="asners">
        <AnswerList questionId={questionId} answers={answers} />
      </Col>
      <Col md={12} sm={8} xs={12}>
        <form className="answers pt-2 mb-5" onSubmit={handleSubmit}>
          <h2 className="text-center">Answer the Top Questions</h2>
          <Link to="/" className="links">
            <p className="links pt-3">Go to the questions page</p>
          </Link>
          <div className="input-wrapper">
            <ReactQuill
              className="answer-input"
              placeholder="Your Answer"
              type="text"
              value={answer}
              onChange={setAnswer}
            />
          </div>
          <br />
          <br />

          <Button className="butto mt-2" type="submit">
            Post Answer
          </Button>
        </form>
      </Col>
    </Row>
  </Container>
</>


  );
};

export default AnswerForm;
