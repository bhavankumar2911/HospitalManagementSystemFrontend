import { Skeleton, Table, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "react-query";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Appointment Timing",
    dataIndex: "fixedDateTime",
    key: "fixedDateTime",
  },
  {
    title: "Doctor",
    dataIndex: "doctor",
    key: "doctor",
  },
  {
    title: "Patient",
    dataIndex: "patient",
    key: "patient",
  },
];

// {
//     tableData,
//     isError,
//     isLoading,
//   }: {
//     tableData: any[];
//     isError: boolean;
//     isLoading: boolean;
//   }

const UpcomingAppointments = () => {
  const [tableData, setTableData] = useState<any[]>([]);

  const fetchUpcomingAppointments = async () => {
    const response = await axios.get("/appointment/upcoming");

    return response.data.data;
  };

  const { isLoading, isError } = useQuery(
    "appointmentsQuery",
    fetchUpcomingAppointments,
    {
      onSuccess: (appointments) => {
        setTableData([
          ...appointments.map((appointment: any) => {
            return {
              id: appointment.id,
              fixedDateTime: new Date(
                appointment.fixedDateTime
              ).toLocaleString(),
              doctor: `${appointment.doctor.staff.firstname} ${appointment.doctor.staff.lastname}`,
              patient: `${appointment.patient.firstname} ${appointment.patient.lastname}`,
            };
          }),
        ]);
      },
    }
  );

  if (isLoading) return <Skeleton active />;

  return (
    <section>
      <Typography.Title level={2}>Upcoming Appointments</Typography.Title>
      <Table
        style={{ overflowX: "scroll" }}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
    </section>
  );
};

export default UpcomingAppointments;
