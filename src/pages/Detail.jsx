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

  const onEditThisCat = (e) => {
    axios.patch(`http://localhost:3001/index/${id}`, e);
    console.log(updatedCat);
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
    //고양이별 댓글 GET
    // axios
    //   .get(`${process.env.REACT_APP_CAT}/board/${id}`)
    //   //
    //   .then((res) => {
    //     setMycomment(res);
    //   });
  }, []);

  // 여기부터 댓글
  //   const submitCommentHandler = async (comment) => {
  //     await axios.post(`${process.env.REACT_APP_CAT}/board/${id}`, comment);
  //     return window.location.reload();
  //   };

  //   const onDeleteComment = async () => {
  //     await axios.delete(`${process.env.REACT_APP_CAT}/board/${id}`);
  //     return window.location.reload();
  //   };

  //   const onEditComment = async (comment) => {
  //     axios.patch(`${process.env.REACT_APP_MUSIC}/board/${id}`, comment);
  //     return window.location.reload();
  //   };

  return (
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
const StButtonGroup = styled.div`
  width: 100%;
  gap: 12px;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
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

{
  /* 
        
        여기부터 코멘트 박스
        
        */
}
{
  /* <STDescBox>
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
                placeholder="댓글을 입력해주세요"
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
              // {!isEditintg &&()}
              <div className="todocontainer" key={comment.commentId}>
                <div className="todoInfo">
                  <h3 className="textBbox">
                    {comment.comment} - {comment.username}
                  </h3>
                  <button
                    className="justDeleteButton"
                    onClick={() => onDeleteComment(comment.commentId)}
                  >
                    ☝️delete
                  </button>
                  <button
                    className="justEditButton"
                    onClick={() => onEditComment(comment.commentId)}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
          <StCommentBox>댓글 1</StCommentBox>
        </STDescBox> */
}
