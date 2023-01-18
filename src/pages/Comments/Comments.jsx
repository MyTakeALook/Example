import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Comment from "./Commment";
import AddComent from "./AddComment";

const Comments = () => {
  const [isShow, setisShow] = useState(false);
  const [mycomment, setMycomment] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_CAT}/board/${id}`).then((res) => {
      setMycomment(res.data);
    });
  }, []);

  return (
    <StCommentAll>
      <StContainer isShow={isShow}>
        <StToggleContainer
          onClick={() => {
            setisShow((pre) => !pre);
          }}
        >
          <div>{isShow ? "눌러서 댓글내리기" : "눌러서 댓글보기"}</div>
        </StToggleContainer>
        <AddComent />
        <StCommentList>
          {mycomment?.map((comment) => (
            <Comment
              key={comment.commentId}
              commentId={comment.commentId}
              comment={comment}
            />
          ))}
        </StCommentList>
      </StContainer>
    </StCommentAll>
  );
};
export default Comments;

const StCommentAll = styled.div``;

///댓글 기능
const StContainer = styled.div`
  height: ${({ isShow }) => (isShow ? "400px" : "40px")};
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #fff;
  transition: height 400ms ease-in-out;
`;

const StToggleContainer = styled.div`
  height: 50px;
  padding: 0 12px;
  border-top: 1px solid #eee;
`;

const StCommentList = styled.div`
  height: 350px;
  overflow: scroll;
`;
