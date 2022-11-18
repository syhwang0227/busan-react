import Footer from "components/commons/Footer";
import HeadlessLayout from "components/layouts/HeadlessLayout";
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Counter = () => {
  // pathVariable
  const { seq } = useParams();

  // queryString.get("seq")

  const navigate = useNavigate();

  const [num, setNum] = useState(0);

  const increase = () => setNum((prev) => prev + 1);

  return (
    <HeadlessLayout>
      <div>
        <div>카운터페이지</div>
        <div>클릭수 {num}</div>
        <div>
          <button onClick={increase}>클릭</button>
        </div>
        {/* <Link to={"/"}>메인으로 이동</Link> */}
        <button onClick={() => navigate("/")}>메인으로 이동</button>
        <Footer />
      </div>
    </HeadlessLayout>
  );
};

export default Counter;
