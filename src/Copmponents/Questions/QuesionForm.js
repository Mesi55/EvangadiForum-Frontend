import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Quesion.css";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Button } from "react-bootstrap";

function QuesionForm({ match }) {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionCodeBlock, setQuestionCodeBlock] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  // Generate a unique post_id for a question
  const id = useParams();
  const { questionId } = useParams();
  // console.log("id==", id, "user==", id);
  const post_id = uuidv4();
  const [visibleQuestions, setVisibleQuestions] = useState([]);
  const handleQuestionSubmit = (e) => {
    const strippedAnswer = questionDescription.replace(/<[^>]+>/g, "");
    e.preventDefault();
    const questionData = {
      //** add new quesions to the db */
      question: questionText,
      questionDescription: strippedAnswer,
      post_id: post_id,
      userId: userData?.user?.id,
      time: new Date(),
    };
    axios
      .post(`${process.env.REACT_APP_base_url}/user/questions`, questionData)
      .then((res) => {
        setQuestions([...questions, res.data]); //* add new
        setQuestionText(""); //** clear input fildes */
        setQuestionDescription("");
        setQuestionCodeBlock("");
        setTags("");

        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" container  row  col-md-12 pt-sm-5 mt-sm-5  px-md-5 mt-5">
      <div className="steps px-sm-0 pt-5 px-md-5 mt-5 ">
        <h3 className="">Steps to write a good quesion</h3>
        <h6 className="">▪Summarize your problem in a one-line title.</h6>
        <h6>▪ Describe your problem in more detail.</h6>
        <h6>▪ Describe what you tried and what you expected to happen.</h6>
        <h6>▪ Review your question and post it to the site</h6>
      </div>
      <h2 className="text-center ">
        Ask a public Question <br />
        <Link className="fs-5 link" to="/">
          Go to the quesion page
        </Link>
      </h2>
      <hr />

      <form onSubmit={handleQuestionSubmit} className="text-center qforms">
        <div>
          <input
            className="fs-5"
            maxLength={200}
            type="text"
            id="question"
            placeholder="Title"
            required
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <br />
        </div>
        <div>
          <br />
          <ReactQuill
            className="fs-5 txt"
            id="description"
            value={questionDescription}
            theme="snow"
            placeholder="Question Description"
            onChange={setQuestionDescription}
          />{" "}
          <br /> 
          <div className="d-sm-block d-md-none"><br /></div>
    
          <Button type="submit" className=" buttons my-5">
            <h5 className=" ">Post Your Quesion</h5>{" "}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default QuesionForm;
