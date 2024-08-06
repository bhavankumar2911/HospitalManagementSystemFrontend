import { Alert, Button, message, Skeleton, Table, Typography } from "antd";
import { ColumnType } from "antd/es/table";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";

const YourAppointments = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getAppointmentsOfTheDoctors = async () => {
    const response = await axios.get("/doctor/appointments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data.data;
  };

  const { isLoading, isError, error } = useQuery(
    "doctorAppointmentsQuery",
    getAppointmentsOfTheDoctors,
    {
      onSuccess: (appointments) => {
        setTableData([
          ...appointments.map((appointment: any) => {
            return {
              appointmentTiming: new Date(
                appointment.fixedDateTime
              ).toLocaleString(),
              patientName: `${appointment.patient.firstname} ${appointment.patient.lastname}`,
              concern: appointment.concern,
              prescribeButton: appointment,
              closeAppointmentLink: appointment.id,
            };
          }),
        ]);
      },
    }
  );

  const closeAppointment = async (appointmentId: number) => {
    const response = await axios.patch("/doctor/appointment/close", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        appointmentId,
      },
    });

    return response.data;
  };

  const { mutate } = useMutation(closeAppointment, {
    onSuccess: (data) => {
      message.success(data.message);
      queryClient.invalidateQueries("doctorAppointmentsQuery");
    },
    onError: (err) => {
      console.log(err);

      if (err instanceof AxiosError && err.response)
        message.error(err.response.data.message);
    },
  });

  const columns: ColumnType<any>[] = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Concern",
      dataIndex: "concern",
      key: "concern",
    },
    {
      title: "Appointment Timing",
      dataIndex: "appointmentTiming",
      key: "appointmentTiming",
    },
    {
      title: "",
      dataIndex: "prescribeButton",
      key: "prescribeButton",
      render: (appointment) => (
        <Link
          to={`/doctor/prescribe/${appointment.patient.id}/${appointment.id}`}
        >
          Prescribe medicine
        </Link>
      ),
    },
    {
      title: "",
      dataIndex: "closeAppointmentLink",
      key: "closeAppointmentLink",
      render: (appointmentId) => (
        <Button onClick={() => mutate(appointmentId)} danger>
          Close appointment
        </Button>
      ),
    },
  ];

  if (isLoading || tableData.length === 0) return <Skeleton active />;

  if (isError) {
    if (error instanceof AxiosError && error.response) {
      if ([403, 401].includes(error.response.status))
        navigate("/auth/staff/login");

      if (error.response.status === 404)
        return (
          <Alert type="warning" message={error.response.data.message} banner />
        );

      return (
        <Alert type="error" message={error.response.data.message} banner />
      );
    }

    return <Alert type="error" message="Something went wrong" banner />;
  }

  return (
    <section>
      <Typography.Title level={2}>Your Appointments</Typography.Title>
      <Table
        style={{ overflowX: "scroll" }}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
    </section>
  );
};

export default YourAppointments;
