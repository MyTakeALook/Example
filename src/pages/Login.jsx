import Router from "../shared/Router";
import React, { useEffect, useState } from "react";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // axios import 합니다
import styled from "styled-components";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <img src="img/main.png" alt="logo" />
      <Stloginbox>
        <StLogin> 로그인</StLogin>
        <StDiv>
          ID:
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder={"아이디를 입력해주세요."}
          />
          <hr></hr>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"비밀번호를 입력해주세요."}
          />{" "}
        </StDiv>{" "}
        <Stdiv2>
          <StButton
            onClick={() => {
              navigate("/");
            }}
          >
            login
          </StButton>

          <StButton
            onClick={() => {
              navigate("/Join");
            }}
          >
            sign up
          </StButton>
        </Stdiv2>
      </Stloginbox>
    </>
  );
}

export default Login;

const Stloginbox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  margin: 50px auto 0 auto;
  height: 70%;
  width: fit-content;
  border: 1.5px solid rgb(255, 255, 255);
  background-color: rgba(0, 0, 0, 0.206);
  border-radius: 15px;
  border: solid black 1px;
`;
const StButton = styled.button`
  margin-left: 10px;
  background-color: black;
  margin-top: 10px;
  padding: 20px 20px;
  text-align: center;
  width: 60px;
  height: 30px;
  opacity: 0.9;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid black;
  font-weight: bold;
  font-size: 13px;
  color: white;
`;
const StDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;
const Stdiv2 = styled.div`
  display: flex;
  flex-direction: row;
`;
const StLogin = styled.div`
  font-size: 19px;
  font-weight: bold;
`;
const StHeader = styled.div``;
