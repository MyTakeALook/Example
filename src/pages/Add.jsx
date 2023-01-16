import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

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
    <>
      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로가기
        </button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onWriteHandler(cats);
          }}
        >
          <div>
            <input
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
            <div></div>
            <input
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
            <div></div>
            <input
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
            <div></div>
            <input
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
            <div></div>
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
          </div>
          <button>저장하기</button>
        </form>
      </div>
    </>
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
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
`;
