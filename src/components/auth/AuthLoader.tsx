import { Skeleton } from "antd";
import React from "react";

const AuthLoader = () => {
  return (
    <div>
      <Skeleton style={{ width: "80%", margin: "2rem auto 0 auto" }} active />
      <Skeleton style={{ width: "80%", margin: "0 auto" }} active />
    </div>
  );
};

export default AuthLoader;
