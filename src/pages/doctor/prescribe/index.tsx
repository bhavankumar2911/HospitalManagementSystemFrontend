import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../context/AppContextProvider";
import AuthLoader from "../../../components/auth/AuthLoader";
import AppLayout from "../../../components/app/AppLayout";
import PrescribeMedicine from "../../../components/doctor/PrescribeMedicine";
import { useEffect } from "react";
import DoctorPrescriptions from "../../../components/doctor/DoctorPrescriptions";
import LogoutButton from "../../../components/auth/LogoutButton";

const navLinks = [
  { key: "home", label: <Link to="/">Home</Link> },
  {
    key: "doctor",
    label: <Link to="/doctor">Your appointments</Link>,
  },
  {
    key: "logout",
    label: <LogoutButton />,
  },
];

const Prescribe = () => {
  const { authenticatingUser, role } = useAppContext();
  const { patientId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticatingUser && role !== "Doctor") {
      navigate("/auth/staff/login");
    }
  }, [authenticatingUser, navigate, role]);

  if (authenticatingUser || role !== "Doctor") return <AuthLoader />;

  return (
    <AppLayout navItems={navLinks}>
      <PrescribeMedicine patientId={patientId as string} />
      <DoctorPrescriptions patientId={patientId as string} />
    </AppLayout>
  );
};

export default Prescribe;
