import React, { useEffect, useState } from "react";
import "./../App.css";
import "./Index.css";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import styles from "./Index.css";
// import { Navbar } from "react-bootstrap";

const Index = () => {
  const [like, seTlike] = useState(0);
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);

  const fetchCat = async () => {
    const { data } = await axios.get("http://localhost:3001/index");
    setCats(data);
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div>
      <Menu>우고소 으름공주꾸미기</Menu>

      <div>
        <Header>
          <Btn
            onClick={() => {
              navigate("/");
            }}
          >
            🐰홈이냥
          </Btn>
          <Btn
            onClick={() => {
              navigate("/out");
            }}
          >
            🐾아웃이냥
          </Btn>
        </Header>
      </div>

      <Listt>
        {cats?.map((cat) => {
          return (
            <div key={cat.id}>
              <div>
                <div className="cat_img"></div>
                <div to={`/Index/${cat.id}`} key={cat.id}>
                  <div>asdasd</div>
                </div>

                <div>
                  <span
                    onClick={() => {
                      seTlike(like + 1);
                    }}
                  >
                    ❤{like}
                  </span>
                </div>
                <br></br>
                <div>
                  <span>
                    <Unit>{cat.catName}</Unit>
                  </span>
                </div>
                <br></br>
                <div>
                  <span>
                    <div>
                      {cat.gender},{cat.age}살
                    </div>
                    <div>집사 : {cat.text}</div>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </Listt>
    </div>
  );
};

const Menu = styled.div`
  font-size: 80px;
  width: 80%;
  border: 4px solid;
  min-height: 100px;
  border-radius: 12px;
  padding: 10px 100px 10px 100px;
  margin: 10px 100px 10px 100px;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 24px;
`;

const Btn = styled.div`
  width: 200px;
  border: 4px solid gray;
  align-items: center;
  min-height: 10px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
  margin: auto;
`;

const Listt = styled.div`
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 70px 0px;
  margin: 0 auto;
  margin-top: 35px;
`;

const Unit = styled.div`
  font-size: 30px;
  line-height: 20px;
  color: #000000;
`;
export default Index;
