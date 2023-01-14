import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../shared/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mycat, setMycat] = useState([]);
  const [mycomment, setMycomment] = useState([]);
  const [addCommnt, setAddCommnt] = useState({
    comment: "",
  });
  const [love, setLove] = useState("");

  useEffect(() => {
    //고양이 상세설명 GET
    axios
      .get(`${process.env.REACT_APP_CAT}/index/detail/${id}`)
      //
      .then((res) => {
        setMycat(res);
      });
    //고양이별 댓글 GET
    axios
      .get(`${process.env.REACT_APP_CAT}/board/${id}`)
      //
      .then((res) => {
        setMycomment(res);
      });
    //고양이별 좋아요 GET
    axios
      .get(`${process.env.REACT_APP_CAT}/board/love/${id}`)
      //
      .then((res) => {
        setLove(res);
      });
  }, []);
  //댓글 보내기 아
  const submitCommentHandler = async (comment) => {
    await axios.post(`${process.env.REACT_APP_CAT}/board/${id}`, comment);
    return window.location.reload();
  };

  const onDeleteComment = async (comment) => {
    await axios.delete(`${process.env.REACT_APP_CAT}/board/${id}`);
    return window.location.reload();
  };

  const onEditComment = async (comment) => {};

  return (
    <Layout>
      <StDetailALl>
        <StCatPic>여기 그림 들어가는데</StCatPic>
        {/* <StButton
          borderColor="#f82c2c"
          onClick={() => {
            navigate("/");
          }}
        >
          이전으로
        </StButton> */}
        <StLoveVIew>
          <StLove>💜 {love}</StLove>
          <StView>뷰 들어가는데</StView>
        </StLoveVIew>
        <STDescBox>
          <StAddComment>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitCommentHandler(addCommnt);
              }}
            >
              <input
                required
                type="text"
                value={addCommnt.comment}
                placeholder="댓글"
                onChange={(ev) => {
                  const { value } = ev.target;
                  setAddCommnt({
                    ...addCommnt,
                    comment: value,
                  });
                }}
              />
              <StButton>기록하기</StButton>
            </form>
          </StAddComment>
          밑에서 부터 댓글 목록
          {mycomment.map((comment) => {
            return (
              <div className="todocontainer" key={comment.commentId}>
                <div className="todoInfo">
                  <h3 className="textBbox">
                    {comment.comment} - {comment.username}
                  </h3>
                  <button
                    className="justEditButton"
                    onClick={() => onDeleteComment(comment.commentId)}
                  >
                    ☝️delete
                  </button>
                  <button
                    className="justEditButton"
                    onClick={() => onEditComment(comment.commentId)}
                  >
                    ☝️delete
                  </button>
                </div>
              </div>
            );
          })}
          <StCommentBox>댓글 1</StCommentBox>
          <StCommentBox>댓글 2</StCommentBox>
          <StCommentBox>댓글 3</StCommentBox>
        </STDescBox>
      </StDetailALl>
    </Layout>
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

const StCatPic = styled.div`
  border: 1px solid red;
  width: 300px;
  height: 300px;
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

const STDescBox = styled.div`
  border: 1px solid black;
  width: 600px;
  height: 800px;
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  //아래로 정열
  flex-direction: column;
  //가운데 배열
  align-items: center;
`;

const StAddComment = styled.text`
  border: 1px solid black;
  width: 500px;
  height: 40px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
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
