import { useAppContext } from "../../context/AppContextProvider";
import { Link, useNavigate } from "react-router-dom";
import AuthLoader from "../../components/auth/AuthLoader";
import AppLayout from "../../components/app/AppLayout";
import YourAppointments from "../../components/doctor/YourAppointments";
import { useEffect } from "react";

const navLinks = [{ key: "home", label: <Link to="/">Home</Link> }];

const DoctorAppointments = () => {
  const { authenticatingUser, role } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticatingUser && role != "Doctor") {
      navigate("/auth/staff/login");
    }
  }, [authenticatingUser]);

  if (authenticatingUser) return <AuthLoader />;

  return (
    <AppLayout navItems={navLinks}>
      <YourAppointments />
    </AppLayout>
  );
};

export default DoctorAppointments;
