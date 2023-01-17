import Router from "../shared/Router";
import React, { useEffect, useState, useRef, useContext } from "react";
import "../App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // axios import 합니다
import styled from "styled-components";
import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AuthContext from "../context/AuthProvider";
// import { useCookies } from "react-cookie";
const LOGIN_URL = "/auth";

const DummyUser = {
  id: "angela@gmail.com",
  password: "test123",
};

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onClickConfirmButton = () => {
    if (id === DummyUser.id && password === DummyUser.password) {
      alert("로그인에 성공헀습니다! ");
      navigate(`/Index`);
    } else {
      alert("등록되지 않은 회원입니다! ");
    }
  };
  //////더미데이터쓰는거/////

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  // useEffect(() => {
  //   // userRef.current.focus();
  // }, []);

  useEffect(() => {
    setErrMsg("");
  }, [id, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ id, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ id, password, roles, accessToken });
      setId("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("서버가 응답하지 않습니다");
      } else if (err.response?.status === 400) {
        setErrMsg("이메일과 패스워드를 모두 입력해주세요");
      } else if (err.response?.status === 401) {
        setErrMsg("회원정보가 존재하지 않습니다");
      } else {
        setErrMsg("로그인에 실패하였습니다");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <Stimage src="img/main.png" alt="logo" />
      <Stloginbox>
        <StLogin> Log in 🐾(ฅ•.•ฅ) </StLogin>
        <StDiv onSubmit={handleSubmit}>
          Email:
          <hr />
          <TextField
            required
            autoFocus
            autoComplete="false"
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            label="이메일을 입력해주세요."
          />
          <hr />
          Password:
          <hr />
          <TextField
            required
            autoComplete="false"
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            label="비밀번호를 입력해주세요"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        </StDiv>
        <Stdiv2>
          <StButton
            type="submit"
            onClick={onClickConfirmButton}
            // onClick={() => {
            //   navigate("/Index");
            // }}
          >
            login
          </StButton>
          <Link to={"/Join"}>
            허걱! 아직 회원이 아니신가요? 회원가입하러가기!{" "}
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
  background-color: #dadada;
  border-radius: 15px;
  border: none;
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
  cursor: pointer;
  /* font-family: "Noto Sans KR", sans-serif; */
`;

const StDiv = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;
const Stdiv2 = styled.form`
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
