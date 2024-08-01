import { MenuItemType } from "antd/es/menu/interface";
import AppLayout from "../../../components/app/AppLayout";
import AddPatient from "../../../components/reception/AddPatient";
import { Link } from "react-router-dom";
import FixAppoinment from "../../../components/reception/FixAppoinment";

const navLinks: MenuItemType[] = [
  { key: "home", label: <Link to="/">Home</Link> },
  {
    key: "appointment",
    label: <Link to="/reception/appointment">Appointments</Link>,
  },
  {
    key: "patient",
    label: <Link to="/reception/patient">Patients</Link>,
  },
];

const Appointment = () => {
  return (
    <AppLayout navItems={navLinks}>
      <FixAppoinment />
    </AppLayout>
  );
};

export default Appointment;
