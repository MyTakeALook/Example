import React, { useEffect, useState } from "react";
import "./../App.css";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../shared/Layout";
import Love from "./Love/Love";

const Authorizationtest =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsoJXquLAiLCJhdXRoIjoiVVNFUiIsImV4cCI6MTY3NDE5NDQyNywiaWF0IjoxNjc0MTA4MDI3fQ.m3mwGImG3L7Ke-f9ipDJRml0xmzGa2Fi1xO8iHkYo1g";

const Index = () => {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);

  const fetchCat = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_CAT}/index/boardList`, {
      headers: {
        Authorization: Authorizationtest,
      },
    });

    setCats(data);
  };

  const onClickDeleteCats = async (id) => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      await axios.delete(`${process.env.REACT_APP_CAT}/index/detail/${id}`, {
        headers: {
          Authorization: Authorizationtest,
        },
      });
      return window.location.reload();
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div>
      <Layout>
        <div>
          <Header>
            {/* <Btn
              onClick={() => {
                navigate("/Index");
              }}
            >
              🐰홈이냥
            </Btn> */}
            <Btn
              onClick={() => {
                navigate("/");
              }}
            >
              로그아웃
            </Btn>
            <Btn
              onClick={() => {
                navigate("/Add");
              }}
            >
              고양이 소개 추가하기
            </Btn>
          </Header>
        </div>
        <Listt>
          {cats?.map((cat) => {
            return (
              <StOneCatBox key={cat.boardId}>
                <div
                  onClick={() => {
                    navigate(`/Detail/${cat.boardId}`);
                  }}
                  key={cat.boardId}
                >
                  디테일(사진들어갈예정)
                </div>
                <div>
                  <StOneCat>
                    <br />
                    <div>
                      <span>
                        <Unit>{cat.catName}</Unit>
                      </span>
                    </div>

                    <br />
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          onClickDeleteCats(cat.boardId);
                        }}
                      >
                        삭제하기
                      </button>
                    </div>
                    <Love key={cat.boardId} cat={cat} />
                  </StOneCat>
                </div>
              </StOneCatBox>
            );
          })}
        </Listt>
      </Layout>
    </div>
  );
};

const StOneCatBox = styled.div`
  margin-left: 20px;
  border: 1px solid gray;
`;

const StOneCat = styled.div``;

const Header = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 24px;
`;

const Btn = styled.div`
  width: 170px;
  background-color: #343434;
  border: none;
  color: white;
  align-items: center;
  min-height: 10px;
  border-radius: 25px;
  padding: 15px;
  margin: auto;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

const Listt = styled.div`
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  gap: 70px 0px;
  margin-top: 35px;
`;

const Unit = styled.div`
  font-size: 30px;
  line-height: 20px;
  color: #000000;
`;
export default Index;
