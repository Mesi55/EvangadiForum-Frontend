import React, { useContext, useEffect, useState } from "react";
import './like.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Likes = ({ answer }) => {
  const [likesCount, setLikesCount] = useState(() => {
    const storedLikesCount = localStorage.getItem(`likesCount_${answer.answer_id}`);
    return storedLikesCount ? parseInt(storedLikesCount) : 0;
  });

  const [dislikesCount, setDislikesCount] = useState(() => {
    const storedDislikesCount = localStorage.getItem(`dislikesCount_${answer.answer_id}`);
    return storedDislikesCount ? parseInt(storedDislikesCount) : 0;
  });

  useEffect(() => {
    localStorage.setItem(`likesCount_${answer.answer_id}`, likesCount.toString());
  }, [likesCount, answer.answer_id]);

  useEffect(() => {
    localStorage.setItem(`dislikesCount_${answer.answer_id}`, dislikesCount.toString());
  }, [dislikesCount, answer.answer_id]);

  const handleLikeClick = () => {
    setLikesCount(prevLikesCount => prevLikesCount + 1);
  };

  const handleDislikeClick = () => {
    setDislikesCount(prevDislikesCount => prevDislikesCount + 1);
  };

  return (
    <div className="likes__container">
      <button className="likesBtn mx-2" onClick={handleLikeClick} title="Click here to like">
        <ThumbUpIcon />
      </button>
      <span>{likesCount}</span>
      <button className="likesBtn mx-2" onClick={handleDislikeClick} title="Click here to dislike">
        <ThumbDownIcon />
      </button>
      <span>{dislikesCount}</span>
    </div>
  );
};

export default Likes;



