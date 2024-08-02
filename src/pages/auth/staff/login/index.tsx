import { MenuItemType } from "antd/es/menu/interface";
import AppLayout from "../../../../components/app/AppLayout";
import { Link } from "react-router-dom";
import StaffLogin from "../../../../components/auth/StaffLogin";

const navLinks: MenuItemType[] = [
  { key: "home", label: <Link to="/">Home</Link> },
];

const Login = () => {
  return (
    <AppLayout navItems={navLinks}>
      <StaffLogin />
    </AppLayout>
  );
};

export default Login;
