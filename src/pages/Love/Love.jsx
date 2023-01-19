import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Authorizationtest =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsoJXquLAiLCJhdXRoIjoiVVNFUiIsImV4cCI6MTY3NDE5NDQyNywiaWF0IjoxNjc0MTA4MDI3fQ.m3mwGImG3L7Ke-f9ipDJRml0xmzGa2Fi1xO8iHkYo1g";

const Love = ({ cat }) => {
  const onEditLove = async () => {
    await axios.post(`${process.env.REACT_APP_CAT}/board/love/${cat.boardId}`, cat.boardId, {
      headers: {
        Authorization: Authorizationtest,
      },
    });
  };

  return (
    <>
      {cat.islove ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEditLove();
          }}
        >
          <button type="submit" onClick={() => {}}>
            💜 {cat.love}
          </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEditLove();
          }}
        >
          <button type="submit" onClick={() => {}}>
            🤍 {cat.love}
          </button>
        </form>
      )}
    </>
  );
};
export default Love;
