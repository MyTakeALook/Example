import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../shared/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments/Comments";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mycat, setMycat] = useState([]);
  //수정 모드 설정
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedCat, setUpdatedCat] = useState({
    catName: "",
    age: "",
    gender: "",
    text: "",
  });

  // 게시물 CRUD
  const onEditThisCat = (e) => {
    axios.patch(`http://localhost:3001/index/${id}`, e);
    return window.location.reload();
  };

  const onDeletThisCat = () => {
    const result = window.confirm("주인님을 지울까요?");
    if (result) {
      axios.delete(`http://localhost:3001/index/${id}`);
      return navigate("/");
    } else {
      return;
    }
  };

  useEffect(() => {
    //고양이 상세설명 GET
    axios
      .get(`http://localhost:3001/index`)
      .then((response) => {
        response.data.filter((list) => {
          if (list.id === Number(id)) {
            setMycat(list);
          }
          return null;
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Layout>
        <StDetailALl>
          {!isEditMode && (
            <StDetailBox>
              <StPicwithDesc>
                <StCatPic>그림</StCatPic>
                <StDecsBox>
                  {mycat.catName}
                  <br />
                  {mycat.age}
                  <br />
                  {mycat.gender}
                  <br />
                  {mycat.text}
                </StDecsBox>
              </StPicwithDesc>
              <button
                size="large"
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                글 수정
              </button>
              <button
                size="large"
                onClick={() => {
                  onDeletThisCat(id);
                }}
              >
                글 삭제
              </button>
              <StLoveVIew>
                <StLove>💜 {mycat.love}</StLove>
                <StView>뷰 들어가는데</StView>
              </StLoveVIew>
            </StDetailBox>
          )}
          {isEditMode && (
            <StDetailBox>
              <StDecsBox>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onEditThisCat(updatedCat);
                    setIsEditMode(false);
                  }}
                >
                  이름 :{" "}
                  <input
                    required
                    type="text"
                    placeholder={mycat.catName}
                    onChange={(ev) => {
                      setUpdatedCat({
                        ...updatedCat,
                        catName: ev.target.value,
                      });
                    }}
                  />
                  <br />
                  나이 :{" "}
                  <input
                    required
                    type="number"
                    min="1"
                    placeholder={mycat.age}
                    onChange={(ev) => {
                      setUpdatedCat({
                        ...updatedCat,
                        age: ev.target.value,
                      });
                    }}
                  />
                  <br />
                  성별 :{" "}
                  <input
                    required
                    type="text"
                    placeholder={mycat.gender}
                    onChange={(ev) => {
                      setUpdatedCat({
                        ...updatedCat,
                        gender: ev.target.value,
                      });
                    }}
                  />
                  <br />
                  설명 :{" "}
                  <input
                    required
                    type="text"
                    placeholder={mycat.text}
                    onChange={(ev) => {
                      setUpdatedCat({
                        ...updatedCat,
                        text: ev.target.value,
                      });
                    }}
                  />
                  <br />
                  <button size="large">저장</button>
                </form>
                <button
                  size="large"
                  onClick={() => {
                    setIsEditMode(false);
                  }}
                >
                  뒤로
                </button>
              </StDecsBox>
            </StDetailBox>
          )}
        </StDetailALl>
        <Comments />
      </Layout>
    </>
  );
};

export default Detail;

const StDetailALl = styled.div`
  margin-top: 20px;
  display: flex;
  //아래로 정열
  flex-direction: column;
  //가운데 배열
  align-items: center;
`;

const StDetailBox = styled.div`
  display: flex;
  //가운데 배열
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StCatPic = styled.div`
  border: 1px solid red;
  width: 300px;
  height: 300px;
`;

const StDecsBox = styled.div`
  border: 1px solid red;
  width: 300px;
  height: 300px;
`;

const StPicwithDesc = styled.div`
  display: flex;
  //가운데 배열
  align-items: center;
  justify-content: center;
`;

const StLoveVIew = styled.div`
  border: 1px solid red;
  width: 600px;
  height: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

const StLove = styled.div`
  margin-top: 5px;
  border: 1px solid red;
  width: 200px;
  height: 40px;
`;
const StView = styled.div`
  margin-top: 5px;
  border: 1px solid red;
  width: 200px;
  height: 40px;
`;
