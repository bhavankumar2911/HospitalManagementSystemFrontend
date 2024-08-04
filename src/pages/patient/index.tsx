import AppLayout from "../../components/app/AppLayout";
import { Link } from "react-router-dom";
import PatientLogin from "../../components/patient/PatientLogin";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { Form, message } from "antd";
import PatientPrescriptions from "../../components/patient/PatientPrescriptions";

const Patient = () => {
  const [form] = Form.useForm();

  const getPatientPrescriptions = async () => {
    const data = form.getFieldsValue();
    const response = await axios.post("/patient/prescription", {
      ...data,
      dateOfBirth: form.getFieldValue("dateOfBirth").toISOString(),
    });

    return response.data.data;
  };

  const { isLoading, isError, mutate, error, data } = useMutation(
    getPatientPrescriptions,
    {
      onError: (err) => {
        if (err instanceof AxiosError && err.response)
          message.error(err.response.data.message);
        else message.error("Something went wrong.");
      },
      onSuccess: (presriptions) => {
        console.log(presriptions);
      },
    }
  );

  const navLinks = [{ key: "home", label: <Link to="/">Home</Link> }];

  return (
    <AppLayout navItems={navLinks}>
      {!!!data && (
        <PatientLogin mutate={mutate} isLoading={isLoading} form={form} />
      )}
      {!!data && <PatientPrescriptions prescriptions={data} />}
    </AppLayout>
  );
};

export default Patient;
