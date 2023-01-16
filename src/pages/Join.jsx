import Router from "../shared/Router";
import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios import 합니다
import styled from "styled-components";
import { TextField } from "@mui/material";
axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.withCredentials = true;

function Join() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword] = useState("");
  const navigate = useNavigate;

  const register = () => {
    if (password.length < 5) {
      alert("비밀번호는 5자리 이상이어야합니다.");
    } else if (name.length < 1) {
      alert("이름을 작성해주세요!");
    } else if (id < 1) {
      alert("아이디를 작성해주세요! ");
    } else if (confirmpassword !== password) {
      alert("엥? 비밀번호를 다시 확인해주세요!");
    } else {
      axios({
        method: "post",
        url: "http://localhost:3001/users",
        data: { name: name, email: id, password: password },
      })
        .then((response) => {
          // Handle success.
          console.log("Well done!");
          console.log("User profile", response.data.name, response.data.id);
          // localStorage.setItem("token", response.data.jwt);
          console.log(response);
          alert("회원가입 성공! 로그인으로 이동합니다");

          navigate("/");
        })
        .catch((error) => {
          // Handle error.jwt이용 일단 x .
          console.log("An error occurred:", error.response);
        });
    }
  };

  return (
    <>
      <Stimage src="img/main.png" alt="logo" />
      <Stloginbox>
        <StSignup> Sign up🐾(ฅ•.•ฅ)</StSignup>
        <StDiv>
          Name:
          <TextField
            autoFocus
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
            placeholder="이름을 입력하세요."
          />
          <hr></hr>
          ID:
          <TextField
            required
            onChange={(event) => {
              setId(event.target.value);
            }}
            value={id}
            placeholder="이용하실 id를 입력하세요."
          />
          <hr></hr>
          Password:
          <TextField
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type="password"
            value={password}
            placeholder="이용하실 패스워드를 입력하세요."
          />
          <hr></hr>Confirm your Password:
          <TextField
            type="password"
            value={confirmpassword}
            placeholder="패스워드를 다시 한번 입력해주세요."
          />
        </StDiv>
        <Stdiv2>
          <StButton
            type="submit"
            onClick={() => {
              register();
            }}
          >
            register
          </StButton>

          <StButton
            onClick={() => {
              navigate("/");
            }}
          >
            cancel
          </StButton>
        </Stdiv2>
      </Stloginbox>
    </>
  );
}

export default Join;

const Stloginbox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  margin: 50px auto 0 auto;
  height: 70%;
  width: 300px;
  background-color: rgba(0, 0, 0, 0.206);
  border-radius: 15px;
  border: 1px solid black;
`;
const StButton = styled.button`
  margin: auto;
  background-color: black;
  margin-top: 10px;
  padding: 20px 20px;
  text-align: center;
  width: 60px;
  height: 30px;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid black;
  font-weight: bold;
  font-size: 13px;
  color: white;
`;
const StDiv = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;
const Stdiv2 = styled.div`
  display: flex;
  flex-direction: row;
`;
const StSignup = styled.div`
  font-size: 19px;
  font-weight: bold;
`;
const Stimage = styled.img`
  width: 250px;
  height: 100px;
`;
