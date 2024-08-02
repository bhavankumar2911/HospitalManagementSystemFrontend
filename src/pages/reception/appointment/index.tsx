import { MenuItemType } from "antd/es/menu/interface";
import AppLayout from "../../../components/app/AppLayout";
import { Link, useNavigate } from "react-router-dom";
import FixAppoinment from "../../../components/reception/FixAppoinment";
import UpcomingAppointments from "../../../components/reception/UpcomingAppointments";
import { useAppContext } from "../../../context/AppContextProvider";
import AuthLoader from "../../../components/auth/AuthLoader";

const navLinks: MenuItemType[] = [
  { key: "home", label: <Link to="/">Home</Link> },
  {
    key: "reception",
    label: <Link to="/reception">Reception</Link>,
  },
  {
    key: "patient",
    label: <Link to="/reception/patient">Patients</Link>,
  },
];

const Appointment = () => {
  const { authenticatingUser, role } = useAppContext();
  const navigate = useNavigate();

  if (authenticatingUser) return <AuthLoader />;

  if (role != "Receptionist") {
    navigate("/auth/staff/login");
    return null;
  }
  return (
    <AppLayout navItems={navLinks}>
      <FixAppoinment />
      <UpcomingAppointments />
    </AppLayout>
  );
};

export default Appointment;
