import { Alert, Skeleton, Table, Typography } from "antd";
import { ColumnType } from "antd/es/table";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

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
    render: (patientId) => (
      <Link to={`/doctor/prescribe/${patientId}`}>Prescribe medicine</Link>
    ),
  },
];

const YourAppointments = () => {
  const [tableData, setTableData] = useState<any[]>([]);

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
              appointmentTiming: dayjs(appointment.fixedDateTime).toString(),
              patientName: `${appointment.patient.firstname} ${appointment.patient.lastname}`,
              concern: appointment.concern,
              prescribeButton: appointment.patient.id,
            };
          }),
        ]);
      },
    }
  );

  if (isLoading) return <Skeleton active />;

  if (isError) {
    if (error instanceof AxiosError && error.response) {
      if ([403, 401].includes(error.response.status))
        navigate("/auth/staff/login");

      if (error.response.status == 404)
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
