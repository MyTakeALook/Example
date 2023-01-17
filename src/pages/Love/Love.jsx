import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Love = ({ cat }) => {
  const [love, setLove] = useState(cat.love);
  const [isLove, setIsLove] = useState(false);

  const onEditLove = async () => {
    await axios.patch(`http://localhost:3001/index/${cat.id}`, { love: love });
  };

  return (
    <>
      {isLove ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEditLove(love);
          }}
        >
          <button
            type="submit"
            onClick={() => {
              setIsLove(false);
              setLove(love - 1);
            }}
          >
            💜 {love}
          </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEditLove(love);
          }}
        >
          <button
            type="submit"
            onClick={() => {
              setIsLove(true);
              setLove(love + 1);
            }}
          >
            🤍 {love}
          </button>
        </form>
      )}
    </>
  );
};
export default Love;
