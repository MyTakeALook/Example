import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../shared/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Comment = ({ comment }) => {
  const [isCommentEditMode, setIsCommentEditMode] = useState(false);
  const [editcomment, setEditcomment] = useState({
    comment: "",
    id: "",
  });

  const onDeleteComment = async (id) => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      await axios.delete(`http://localhost:3001/comments/${id}`);
      return window.location.reload();
    } else {
      return;
    }
  };

  const onEditComment = async (e) => {
    console.log(e);
    await axios.patch(`http://localhost:3001/comments/${e.id}`, e);
    // return window.location.reload();
  };

  return (
    <>
      {!isCommentEditMode ? (
        <StCommentBox>
          {comment.comment} : {comment.username}
          <br />
          <button
            size="large"
            onClick={() => {
              setIsCommentEditMode(true);
            }}
          >
            댓글 수정
          </button>
          <button
            size="large"
            onClick={() => {
              onDeleteComment(comment.id);
            }}
          >
            댓글 삭제
          </button>
        </StCommentBox>
      ) : (
        <form>
          <input
            required
            type="text"
            onChange={(ev) => {
              setEditcomment({
                ...editcomment,
                comment: ev.target.value,
                id: comment.id,
              });
            }}
          />
          <button onClick={() => onEditComment(editcomment)}>
            댓글 수정 완료
          </button>
          {/* <button onClick={setIsCommentEditMode(false)}>댓글 수정 취소</button> */}
        </form>
      )}
    </>
  );
};

export default Comment;

const StCommentBox = styled.div`
  margin: 10px 0 0;
  border: 1px solid black;
  width: 500px;
  height: 80px;
`;
