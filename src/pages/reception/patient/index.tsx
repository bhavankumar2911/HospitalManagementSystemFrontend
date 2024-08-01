import { MenuItemType } from "antd/es/menu/interface";
import AppLayout from "../../../components/app/AppLayout";
import AddPatient from "../../../components/reception/AddPatient";
import { Link, redirect } from "react-router-dom";

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

const Patient = () => {
  return (
    <AppLayout navItems={navLinks}>
      <AddPatient />
    </AppLayout>
  );
};

export default Patient;
