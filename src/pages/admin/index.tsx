import React, { useEffect } from "react";
import AppLayout from "../../components/app/AppLayout";
import AddStaff from "../../components/admin/AddStaff";
import { useAppContext } from "../../context/AppContextProvider";
import AuthLoader from "../../components/auth/AuthLoader";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [{ key: "home", label: <Link to="/">Home</Link> }];

const Admin: React.FC = () => {
  const { authenticatingUser, role } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticatingUser && role !== "Admin") {
      navigate("/auth/staff/login");
    }
  }, [authenticatingUser, navigate, role]);

  if (authenticatingUser || role !== "Admin") return <AuthLoader />;

  return (
    <AppLayout navItems={navLinks}>
      <AddStaff />
    </AppLayout>
  );
};

export default Admin;
