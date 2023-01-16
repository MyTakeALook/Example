import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../shared/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
    // return window.location.reload();
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

  //댓글 CRUD
  const [isShow, setisShow] = useState(false);
  const [mycomment, setMycomment] = useState([]);
  const [isCommentEditMode, setIsCommentEditMode] = useState(false);
  const [newcomment, setNewcomment] = useState({
    comment: "",
    username: "",
  });
  const [editcomment, setEditcomment] = useState({
    comment: "",
    id: "",
  });

  const submitCommentHandler = async (comment) => {
    await axios.post(`http://localhost:3001/comments`, comment);
    // return window.location.reload();
  };

  const onDeleteComment = async (id) => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      await axios.delete(`http://localhost:3001/comments/${id}`);
      // return window.location.reload();
    } else {
      return;
    }
  };

  const onEditComment = async (e) => {
    console.log(e);
    axios.patch(`http://localhost:3001/comments/${e.id}`, e.comment);
    // return window.location.reload();
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
    // 고양이별 댓글 GET
    axios.get(`http://localhost:3001/comments`).then((res) => {
      setMycomment(res.data);
    });
  }, []);

  return (
    <>
      <Layout>
        <StDetailALl>
          {!isEditMode && (
            <StDetailBox>
              <StPicwithDesc>
                <StCatPic>그림넣는거 채정님한테 물어보기</StCatPic>
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
                    type="text"
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
        {/* 댓글 시작 */}
        <StCommentAll>
          {!isEditMode && (
            <StContainer isShow={isShow}>
              <StToggleContainer
                onClick={() => {
                  setisShow((pre) => !pre);
                }}
              >
                <div>{isShow ? "눌러서 댓글내리기" : "눌러서 댓글보기"}</div>
              </StToggleContainer>
              <StCommentList>
                <div>
                  {!isCommentEditMode && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitCommentHandler(newcomment);
                      }}
                    >
                      <input
                        required
                        type="text"
                        name="comment"
                        value={newcomment.comment}
                        placeholder="🎶comment🎶"
                        onChange={(ev) => {
                          const { value } = ev.target;
                          setNewcomment({
                            ...newcomment,
                            comment: value,
                          });
                        }}
                      />
                      <input
                        required
                        type="text"
                        name="username"
                        placeholder="🎶username🎶"
                        value={newcomment.username}
                        onChange={(ev) => {
                          const { value } = ev.target;
                          setNewcomment({
                            ...newcomment,
                            username: value,
                          });
                        }}
                      />
                      <StButton>댓글작성</StButton>
                    </form>
                  )}
                  {mycomment?.map((mycomment) => {
                    return (
                      <div key={mycomment.id}>
                        {!isCommentEditMode && (
                          <StCommentBox>
                            {mycomment.comment} : {mycomment.username}
                            <br />
                            <button
                              size="large"
                              onClick={() => {
                                setIsCommentEditMode(true);
                              }}
                            >
                              댓글 수정
                            </button>
                            <button
                              size="large"
                              onClick={() => {
                                onDeleteComment(mycomment.id);
                              }}
                            >
                              댓글 삭제
                            </button>
                          </StCommentBox>
                        )}
                      </div>
                    );
                  })}
                  {isCommentEditMode && (
                    <form
                      onSubmit={(e) => {
                        onEditComment(e);
                      }}
                    >
                      <input
                        required
                        type="text"
                        key={mycomment.id}
                        onChange={(ev) => {
                          setEditcomment({
                            ...editcomment,
                            comment: ev.target.value,
                            id: mycomment.id,
                          });
                        }}
                      />
                      <button>댓글 수정 완료</button>
                    </form>
                  )}
                </div>
              </StCommentList>
            </StContainer>
          )}
        </StCommentAll>
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

const StButton = styled.button`
  background-color: beige;
  margin-left: 30px;
`;

const StCommentBox = styled.div`
  margin: 10px 0 0;
  border: 1px solid black;
  width: 500px;
  height: 80px;
`;

const StCommentAll = styled.div``;
///댓글 기능
const StContainer = styled.div`
  height: ${({ isShow }) => (isShow ? "400px" : "40px")};
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #fff;
  transition: height 400ms ease-in-out;
`;

const StToggleContainer = styled.div`
  height: 50px;
  padding: 0 12px;
  border-top: 1px solid #eee;
`;

const StCommentList = styled.div`
  height: 350px;
  overflow: scroll;
`;
