import { MenuItemType } from "antd/es/menu/interface";
import AppLayout from "../../../components/app/AppLayout";
import AddPatient from "../../../components/reception/AddPatient";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContextProvider";
import AuthLoader from "../../../components/auth/AuthLoader";

const navLinks: MenuItemType[] = [
  { key: "home", label: <Link to="/">Home</Link> },
  {
    key: "reception",
    label: <Link to="/reception">Reception</Link>,
  },
  {
    key: "appointment",
    label: <Link to="/reception/appointment">Appointments</Link>,
  },
];

const Patient = () => {
  const { authenticatingUser, role } = useAppContext();
  const navigate = useNavigate();

  if (authenticatingUser) return <AuthLoader />;

  if (role != "Receptionist") {
    navigate("/auth/staff/login");
    return null;
  }

  return (
    <AppLayout navItems={navLinks}>
      <AddPatient />
    </AppLayout>
  );
};

export default Patient;
