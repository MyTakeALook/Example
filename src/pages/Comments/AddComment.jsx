import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddCommentForm = () => {
  const { id } = useParams();
  const [comment, setComment] = useState({
    username: "",
    comment: "",
    listid: id,
  });

  const submitCommentHandler = async (comment) => {
    await axios.post(`http://localhost:3001/comments`, comment);
    return window.location.reload();
  };

  return (
    <StForm
      onSubmit={(e) => {
        e.preventDefault();
        submitCommentHandler(comment);
      }}
    >
      <StNameInput>
        <input
          placeholder="작성자"
          type="text"
          name="username"
          onChange={(ev) => {
            setComment({
              ...comment,
              username: ev.target.value,
            });
          }}
          maxLength={5}
        />
      </StNameInput>
      <input
        placeholder="댓글을 추가하세요. (100자 이내)"
        name="content"
        type="text"
        onChange={(ev) => {
          setComment({
            ...comment,
            comment: ev.target.value,
          });
        }}
        maxLength={100}
      />
      <button type="submit">추가하기</button>
    </StForm>
  );
};

export default AddCommentForm;

const StNameInput = styled.div`
  width: 150px;
`;

const StForm = styled.form`
  gap: 12px;
  width: 100%;
  padding: 0 12px;
`;
