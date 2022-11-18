import Header from "components/commons/Header";
import React from "react";

const HeadLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default HeadLayout;
