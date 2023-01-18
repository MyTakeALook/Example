import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddCommentForm = () => {
  // const [cookies, setCookie] = useCookies(["쿠키 이름"]);
  const { id } = useParams();
  const [comment, setComment] = useState({
    // id: Date.now(),
    comment: "",
  });

  const submitCommentHandler = async (comment) => {
    await axios.post(`${process.env.REACT_APP_CAT}/board/${id}`, {
      comment,
      // id,
    });
    // return window.location.reload();
  };

  return (
    <StForm
      onSubmit={(e) => {
        e.preventDefault();
        submitCommentHandler(comment);
      }}
    >
      <StNameInput>
        {/* <input
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
        /> */}
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
