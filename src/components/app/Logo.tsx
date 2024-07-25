import { Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link style={{ lineHeight: 0 }} to="/">
      <Typography.Text style={{ color: "white", fontSize: "2rem" }}>
        {" "}
        {/* <b>Health</b>Ease */}
        Health<b>Ease</b>
      </Typography.Text>
    </Link>
  );
};

export default Logo;
