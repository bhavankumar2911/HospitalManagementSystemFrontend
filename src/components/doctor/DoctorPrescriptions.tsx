import { Alert, Collapse, Skeleton, Table, Typography } from "antd";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import getConsumingIntervalOptions from "../../lib/app/getConsumingIntervalOptions";

const columns = [
  {
    title: "Medicine name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Dosage (mg)",
    dataIndex: "dosage",
    key: "dosage",
  },
  {
    title: "Interval",
    dataIndex: "interval",
    key: "interval",
  },
  {
    title: "Duration (days)",
    dataIndex: "duration",
    key: "duration",
  },
];

const DoctorPrescriptions = ({ patientId }: { patientId: string }) => {
  const [items, setItems] = useState<any[]>([]);

  const getPrescriptionHistory = async () => {
    const response = await axios.get(
      `/doctor/patient/prescription/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data.data;
  };

  const { isLoading, isError, error } = useQuery(
    "doctorPrescriptionsQuery",
    getPrescriptionHistory,
    {
      onSuccess: (prescriptions) => {
        const tempItems = [];

        for (const prescriptionId in prescriptions) {
          const data = prescriptions[prescriptionId].map(
            (prescription: any) => {
              return {
                name: prescription.medicine.name,
                dosage: prescription.dosageInMG,
                interval: (getConsumingIntervalOptions() as any)[
                  prescription.consumingInterval
                ],
                duration: prescription.noOfDays,
              };
            }
          );

          tempItems.push({
            key: prescriptionId,
            label: `Prescription #${prescriptionId}`,
            children: (
              <Table columns={columns} dataSource={data} pagination={false} />
            ),
          });
        }

        setItems([...tempItems]);
      },
    }
  );

  if (isLoading) <Skeleton active />;

  if (isError) {
    if (error instanceof AxiosError && error.response) {
      return (
        <Alert type="error" message={error.response.data.message} banner />
      );
    }

    return <Alert type="error" message="Something went wrong" banner />;
  }

  if (items.length === 0) return null;

  return (
    <section>
      <Typography.Title level={2}>Prescription History</Typography.Title>
      <Collapse items={items} />
    </section>
  );
};

export default DoctorPrescriptions;
