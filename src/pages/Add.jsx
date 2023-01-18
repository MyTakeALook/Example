import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Layout from "../shared/Layout";

const Add = () => {
  const navigate = useNavigate();
  const [cats, setCats] = useState({
    id: 0,
    like: "",
    catName: "",
    age: "",
    gender: "",
    text: "",
    image: "",
  });

  const onWriteHandler = async (cats) => {
    await axios.post("http://localhost:3001/index", cats);
    navigate("/index");
  };
  return (
    <StCenter>
      <Layout>
        <StWhole>
          <StTitleBox>🐾 우리 고양이를 소개합니다 🐾</StTitleBox>
          <StAddCard>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onWriteHandler(cats);
              }}
            >
              <StInputBox>
                <br />
                <StInput
                  fullwidth
                  type="text"
                  onChange={(event) => {
                    const { value } = event.target;
                    setCats({
                      ...cats,
                      catName: value,
                    });
                  }}
                  placeholder="주인님 존함:"
                  value={cats.catName}
                  name="catName"
                  required
                />

                <StInput
                  fullwidth
                  type="text"
                  onChange={(event) => {
                    const { value } = event.target;
                    setCats({
                      ...cats,
                      gender: value,
                    });
                  }}
                  value={cats.gender}
                  placeholder="주인님 성별:"
                  name="gender"
                  required
                />

                <StInput
                  type="text"
                  onChange={(event) => {
                    const { value } = event.target;
                    setCats({
                      ...cats,
                      age: value,
                    });
                  }}
                  value={cats.age}
                  placeholder="주인님 연세:"
                  name="age"
                  required
                />

                <StInput
                  type="text"
                  onChange={(event) => {
                    const { value } = event.target;
                    setCats({
                      ...cats,
                      name: value,
                    });
                  }}
                  value={cats.name}
                  placeholder="집사이름:"
                  name="name"
                  required
                />
                <StInput type="file" />
                <Textarea
                  name="text"
                  onChange={(event) => {
                    const { value } = event.target;
                    setCats({
                      ...cats,
                      text: value,
                    });
                  }}
                  value={cats.text}
                  rows="10"
                  maxLength={200}
                  placeholder="주인님 설명 :"
                  required
                />
              </StInputBox>
              <StButtons>
                <StButton type="submit">저장하기</StButton>

                <StButton
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  뒤로가기
                </StButton>
              </StButtons>{" "}
            </form>
          </StAddCard>
        </StWhole>
      </Layout>
    </StCenter>
  );
};

export default Add;

// 전체중앙정렬
const StCenter = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  justify-content: "space-between";
`;

// textarea 크기고정(width 100%)및 css
const Textarea = styled.textarea`
  margin-top: 10px;
  width: 200px;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
  border-radius: 20px;
  width: 300px;
`;
const StAddCard = styled.div`
  /* text-align: center; */
  padding-top: 50px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: #dadada;
  width: 400px;
  height: 500px;
  border-radius: 60px;
`;

const StButton = styled.button`
  margin: 10px auto auto auto;
  background-color: black;
  text-align: center;
  width: 90px;
  height: 40px;
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
const StButtons = styled.div`
  display: flex;
  flex-direction: column;
`;
const StWhole = styled.div`
  margin-top: 100px;
`;
const StTitleBox = styled.h2`
  /* text-align: center; */
  padding-top: 30px;
  padding-bottom: 110px;
  margin-bottom: -110px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: #dadada;
  width: 400px;
  height: 50px;
  border-radius: 60px;
`;
const StInputBox = styled.div`
  margin-top: -50px;
  /* border: solid 2px black; */
  width: 350px;
  text-align: center;
`;
const StInput = styled.input`
  width: 300px;
  height: 20px;
  border-radius: 15px;
  border: none;
  padding: 5px;
  margin-top: 5px;
`;
