import { Collapse, Table, Typography } from "antd";
import getConsumingIntervalOptions from "../../lib/app/getConsumingIntervalOptions";

const PatientPrescriptions = ({ prescriptions }: { prescriptions: any }) => {
  const items = [];
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

  for (const prescriptionId in prescriptions) {
    const data = prescriptions[prescriptionId].map((prescription: any) => {
      return {
        name: prescription.medicine.name,
        dosage: prescription.dosageInMG,
        interval: (getConsumingIntervalOptions() as any)[
          prescription.consumingInterval
        ],
        duration: prescription.noOfDays,
      };
    });

    items.push({
      key: prescriptionId,
      label: `Prescription #${prescriptionId}`,
      children: (
        <Table columns={columns} dataSource={data} pagination={false} />
      ),
    });
  }

  return (
    <section>
      <Typography.Title level={2}>Your Prescriptions</Typography.Title>
      <Collapse items={items} />
    </section>
  );
};

export default PatientPrescriptions;
