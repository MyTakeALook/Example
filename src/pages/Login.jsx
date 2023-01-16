import Router from "../shared/Router";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // axios import 합니다
import styled from "styled-components";
import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Stimage src="img/main.png" alt="logo" />
      <Stloginbox>
        <StLogin> Log in 🐾(ฅ•.•ฅ) </StLogin>
        <StDiv>
          ID:
          <TextField
            required
            autoFocus
            fullWidths
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            label="ID를 입력해주세요."
          />
          <hr></hr>
          Password:
          <TextField
            required
            fullWidth
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            label="비밀번호를 입력해주세요"
          />{" "}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        </StDiv>{" "}
        <Stdiv2>
          <StButton
            type="submit"
            onClick={() => {
              navigate("/Index");
            }}
          >
            login
          </StButton>{" "}
          <Link to={"/Join"}>
            허걱! 아직 아이디가 없으신가요? 회원가입하러가기!{" "}
          </Link>
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
  margin: auto auto 30px auto;
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
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;
const Stdiv2 = styled.div`
  display: flex;
  flex-direction: column;
`;
const StLogin = styled.div`
  font-size: 19px;
  font-weight: bold;
`;

const Stimage = styled.img`
  width: 250px;
  height: 100px;
`;
