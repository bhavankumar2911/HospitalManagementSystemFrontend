import { MenuItemType } from "antd/es/menu/interface";
import AppLayout from "../../../components/app/AppLayout";
import AddPatient from "../../../components/reception/AddPatient";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContextProvider";
import AuthLoader from "../../../components/auth/AuthLoader";
import { useEffect } from "react";
import LogoutButton from "../../../components/auth/LogoutButton";

const navLinks: MenuItemType[] = [
  { key: "home", label: <Link to="/">Home</Link> },
  {
    key: "appointment",
    label: <Link to="/reception/appointment">Appointments</Link>,
  },
  {
    key: "logout",
    label: <LogoutButton />,
  },
];

const Patient = () => {
  const { authenticatingUser, role } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticatingUser && role !== "Receptionist") {
      navigate("/auth/staff/login");
    }
  }, [authenticatingUser, navigate, role]);

  if (authenticatingUser || role !== "Receptionist") return <AuthLoader />;

  return (
    <AppLayout navItems={navLinks}>
      <AddPatient />
    </AppLayout>
  );
};

export default Patient;
