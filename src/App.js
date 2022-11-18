import Counter from "pages/Counter";
import Main from "pages/Main";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/counter/:seq"} element={<Counter />} />
        <Route path={"*"} element={<div>페이지가 없습니다.</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
