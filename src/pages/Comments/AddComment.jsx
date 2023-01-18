import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddCommentForm = () => {
  // const [cookies, setCookie] = useCookies(["쿠키 이름"]);
  const { id } = useParams();
  const [comment, setComment] = useState({
    comment: "",
  });

  const Authorizationtest =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsoJXquLAiLCJhdXRoIjoiVVNFUiIsImV4cCI6MTY3NDE0NzgwMCwiaWF0IjoxNjc0MDYxNDAwfQ.URZVNIyiIdWIvWIso_q_LszLWH1F1icSsHQY5sfKlCE";

  // const submitCommentHandler = (comment) => {
  //   fetch(`${process.env.REACT_APP_CAT}/board/${id}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", Authorization: Authorizationtest },
  //     body: JSON.stringify(comment),
  //   }).then((response) => response.json());
  // };

  const submitCommentHandler = (comment) => {
    axios.post(`${process.env.REACT_APP_CAT}/board/${id}`, comment, {
      headers: {
        Authorization: Authorizationtest,
      },
    });
  };

  return (
    <StForm
      onSubmit={(e) => {
        e.preventDefault();
        submitCommentHandler(comment);
      }}
    >
      <StNameInput></StNameInput>
      <StAddinput>
        <StInput
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
        <StButton type="submit">추가하기</StButton>
      </StAddinput>
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
const StAddinput = styled.div`
  margin: 40px auto auto 30px;
`;
const StInput = styled.input`
  width: 400px;
  height: 40px;
  border-radius: 20px;
  border: solid white 1px;
  background-color: #f1f1f1;
  padding-left: 10px;
`;
const StButton = styled.button`
  margin: -40px auto auto 420px;
  background-color: black;
  text-align: center;
  width: 70px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid black;
  font-weight: bold;
  font-size: 13px;
  color: white;
  cursor: pointer;
  /* font-family: "Noto Sans KR", sans-serif; */
`;
