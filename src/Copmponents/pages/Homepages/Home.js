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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_base_url}/user/questions`);
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
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_base_url}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        });
//  let token = localStorage.getItem("auth-token");
//       try {
//         const res = await axios.get("http://localhost:7400/user", {
//           headers: { "x-auth-token": token },
//         });

        setUserData({
          token: localStorage.getItem("auth-token"),
          user: res.data,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [setUserData]);
  //** let user to login if not signed in */
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);


  return (
    <div className="" >
      <div className="d-flex home-page mx-5 ">
        <div className="ask">
          <Link to="questions " className="link">
            {" "}
            <h3 className="askQ" title="click here to ask">Aks Quesiosn</h3>
          </Link>{" "}
          <br />
        </div>
     
        <div className=" d-flex welcome">
          
       <h4 className="mt-1 mx-1">Welcome: </h4>
          <h2 className=""> 
         {userData.user?.display_name}
          </h2> 
          {/* <img 
  src={`https://ui-avatars.com/api/?name=${userData.user?.display_name}&background=FF0000&color=fff&size=50&rounded=true`}
  alt="User Avatar"
  className="avatars mx-2"
/>   */}
        </div>
      </div>
      <div   className="search-input ">
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
