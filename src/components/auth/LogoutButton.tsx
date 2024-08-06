import { Button } from "antd";
import { useState } from "react";
import { useQueryClient } from "react-query";

const LogoutButton = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const queryClient = useQueryClient();

  const logout = async () => {
    localStorage.removeItem("token");
    setLoggingOut(true);
    await queryClient.invalidateQueries("authQuery");
    setLoggingOut(false);
  };

  return (
    <Button loading={loggingOut} onClick={logout} type="primary" danger>
      Logout
    </Button>
  );
};

export default LogoutButton;
