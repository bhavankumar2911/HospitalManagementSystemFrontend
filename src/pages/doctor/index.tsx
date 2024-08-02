import { useAppContext } from "../../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import AuthLoader from "../../components/auth/AuthLoader";
import AppLayout from "../../components/app/AppLayout";
import YourAppointments from "../../components/doctor/YourAppointments";

const navLinks = [{ key: "home", label: "Home" }];

const DoctorAppointments = () => {
  const { authenticatingUser, role } = useAppContext();
  const navigate = useNavigate();

  if (authenticatingUser) return <AuthLoader />;

  if (role != "Doctor") {
    navigate("/auth/staff/login");
    return null;
  }

  return (
    <AppLayout navItems={navLinks}>
      <YourAppointments />
    </AppLayout>
  );
};

export default DoctorAppointments;
