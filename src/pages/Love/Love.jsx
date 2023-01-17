import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Love = ({ cat }) => {
  const [love, setLove] = useState(cat.love);
  const [isLove, setIsLove] = useState(false);

  const onEditLove = async (e) => {
    console.log(e);
    await axios.patch(`http://localhost:3001/index/${cat.love}`, e);
  };

  return (
    <>
      {isLove ? (
        <form>
          <div
            onClick={() => {
              setIsLove(false);
              setLove(love - 1);
              onEditLove(love);
            }}
          >
            💜 {love}
          </div>
        </form>
      ) : (
        <div
          onClick={() => {
            setIsLove(true);
            setLove(love + 1);
            onEditLove(love);
          }}
        >
          🤍 {love}
        </div>
      )}
    </>
  );
};
export default Love;
