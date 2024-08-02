import React from "react";
import AppLayout from "../../components/app/AppLayout";
import AddStaff from "../../components/admin/AddStaff";
import { useAppContext } from "../../context/AppContextProvider";
import AuthLoader from "../../components/auth/AuthLoader";
import { useNavigate } from "react-router-dom";

const navLinks = [{ key: "home", label: "Home" }];

const Admin: React.FC = () => {
  const { authenticatingUser, role } = useAppContext();
  const navigate = useNavigate();

  if (authenticatingUser) return <AuthLoader />;

  if (role != "Admin") {
    navigate("/auth/staff/login");
    return null;
  }

  return (
    <AppLayout navItems={navLinks}>
      <AddStaff />
    </AppLayout>
  );
};

export default Admin;
