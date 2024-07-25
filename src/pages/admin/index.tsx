import React from "react";
import AppLayout from "../../components/app/AppLayout";
import AddRole from "../../components/admin/AddRole";
import AddStaff from "../../components/admin/AddStaff";

const navLinks = [{ key: "home", label: "Home" }];

const Admin: React.FC = () => {
  return (
    <AppLayout navItems={navLinks}>
      <AddRole />
      <AddStaff />
    </AppLayout>
  );
};

export default Admin;
