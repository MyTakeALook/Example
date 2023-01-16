import Router from "../shared/Router";
import React, { useEffect, useState } from "react";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // axios import 합니다
import styled from "styled-components";
function Join() {
  const navigate = useNavigate();
  return (
    <>
      <Stimage src="img/main.png" alt="logo" />
      <Stloginbox>
        <StSignup> Sign up🐾(ฅ•.•ฅ)</StSignup>
        <StDiv>
          Name:<input></input>
          <hr></hr>
          ID:<input></input>
          <hr></hr>
          Password:<input></input>
          <hr></hr>Confirm your Password:<input></input>
        </StDiv>{" "}
        <Stdiv2>
          <StButton
            onClick={() => {
              navigate("/Index");
            }}
          >
            register
          </StButton>

          <StButton
            onClick={() => {
              navigate("/Login");
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
  width: fit-content;
  background-color: rgba(0, 0, 0, 0.206);
  border-radius: 15px;
  border: 1px solid black;
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
const StSignup = styled.div`
  font-size: 19px;
  font-weight: bold;
`;
const Stimage = styled.img`
  width: 250px;
  height: 100px;
`;
