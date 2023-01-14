import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "../pages/List";
import Detail from "../pages/Detail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/Detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
