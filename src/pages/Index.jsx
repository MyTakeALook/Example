import React, { useEffect, useState } from "react";
import "./../App.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../shared/Layout";
import Love from "./Love/Love";

const Authorizationtest =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsoJXquLAiLCJhdXRoIjoiVVNFUiIsImV4cCI6MTY3NDI4Mjk5NywiaWF0IjoxNjc0MTk2NTk3fQ.W1BpuVS4OymRI2eRcTZZXiuq6M0hl8hmxxFm7qaxyQM";

const Index = () => {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [rankcats, setRankcats] = useState([]);

  const fetchCat = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_CAT}/index/boardList`, {
      headers: {
        Authorization: Authorizationtest,
      },
    });
    setCats(data);
  };

  const fetchRank = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_CAT}/index/rankBoard`, {
      headers: {
        Authorization: Authorizationtest,
      },
    });
    setRankcats(data);
    console.log(rankcats);
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
    // fetchRank();
  }, []);

  return (
    <div>
      <Layout>
        <StFirstLine>
          <div className="one">
            <StCrown src="img/1등.png" alt="crown 1" />
            <StOneCatBox>
              <div>{rankcats[0]}</div>

              <div>
                <StOneCat>
                  <br />
                  <div>
                    <span>
                      <Unit>1위사진</Unit>
                    </span>
                  </div>
                  <br />
                </StOneCat>
              </div>
            </StOneCatBox>
          </div>
        </StFirstLine>
        <br />
        <StSecondLine>
          <div className="two">
            <StSecondThird src="img/crown.png" alt="crown 2" />
            <StOneCatBox>
              <div>이미지</div>
              <div>
                <StOneCat>
                  <br />
                  <div>
                    <span>
                      <Unit>2위</Unit>
                    </span>
                  </div>
                  <br />
                </StOneCat>
              </div>
            </StOneCatBox>
          </div>
          <div className="three">
            {" "}
            <StSecondThird src="img/crown.png" alt="crown 3" />
            <StOneCatBox>
              <div>이미지</div>
              <div>
                <StOneCat>
                  <br />
                  <div>
                    <span>
                      <Unit>3위</Unit>
                    </span>
                  </div>
                  <br />
                </StOneCat>
              </div>
            </StOneCatBox>
          </div>
        </StSecondLine>

        <div>
          <Header>
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
            <Btn onClick="http://43.200.163.145/chatroom">다른 집사와 대화하기</Btn>
          </Header>
        </div>
        <Listt>
          {cats?.map((cat) => {
            return (
              <StOneCatBox key={cat.boardId}>
                <div
                  key={cat.boardId}
                  onClick={() => {
                    navigate(`/Detail/${cat.boardId}`);
                  }}
                >
                  <img src={cat.imageUrl} />
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
                      <StButton
                        type="button"
                        onClick={() => {
                          onClickDeleteCats(cat.boardId);
                        }}
                      >
                        삭제하기
                      </StButton>
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

export default Index;

const StOneCatBox = styled.div`
  margin-left: 20px;
  background-color: #dadada;
  /* border: 1px solid gray; */
  padding: 15px;
  border-radius: 20px;
  width: 300px;
  height: 200px;
`;

const StFirstLine = styled.div`
  margin-top: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StSecondLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StOneCat = styled.div``;

const Header = styled.div`
  margin-top: 80px;
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
const StButton = styled.button`
  margin: auto;
  background-color: black;
  margin-top: 10px;
  text-align: center;
  width: 70px;
  height: 30px;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid black;
  font-weight: bold;
  font-size: 10px;
  color: white;
  cursor: pointer;
  /* font-family: "Noto Sans KR", sans-serif; */
`;
const StCrown = styled.img`
  width: 220px;
  height: 140px;
  justify-content: center;
  margin: auto;
  display: flex;
  align-items: center;
`;
const StSecondThird = styled.img`
  width: 110px;
  height: 70px;
  justify-content: center;
  margin: auto;
  display: flex;
  align-items: center;
`;
