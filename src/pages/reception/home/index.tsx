import { MenuItemType } from "antd/es/menu/interface";
import AppLayout from "../../../components/app/AppLayout";
import { Link } from "react-router-dom";

const navLinks: MenuItemType[] = [
  { key: "home", label: <Link to="/">Home</Link> },
  {
    key: "patient",
    label: <Link to="/reception/patient">Patients</Link>,
  },
  {
    key: "appointment",
    label: <Link to="/reception/appointment">Appointments</Link>,
  },
];

const ReceptionHome = () => {
  return <AppLayout navItems={navLinks}>Reception</AppLayout>;
};

export default ReceptionHome;
