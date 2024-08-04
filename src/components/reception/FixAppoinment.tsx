import {
  Alert,
  Button,
  Col,
  Form,
  message,
  Row,
  Select,
  Skeleton,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { DefaultOptionType } from "antd/es/select";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import SubmitButton from "../app/SubmitButton";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const FixAppoinment = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  // const [selectedDoctor, setSelectedDoctor] = useState(-1);
  const [doctorOptions, setDoctorOptions] = useState<DefaultOptionType[]>([]);
  const [patientOptions, setPatientOptions] = useState<DefaultOptionType[]>([]);
  const [slotOptions, setSlotOptions] = useState<DefaultOptionType[]>([]);

  const fetchDoctorsWithLeastAppointments = async () => {
    const response = await axios.get("/doctor");
    return response.data;
  };

  const fetchPatients = async () => {
    const response = await axios.get("/patient");
    return response.data;
  };

  const fixAppointment = async () => {
    const data = form.getFieldsValue();

    const response = await axios.post("/appointment", data);

    return response.data;
  };

  const {
    isLoading: loadingDoctors,
    isError: isDoctorsQueryError,
    error: doctorsQueryError,
  } = useQuery("doctorsQuery", fetchDoctorsWithLeastAppointments, {
    onSuccess: (data) => {
      setDoctorOptions([
        ...data.data.map((doctor: any) => {
          return {
            label: doctor.firstname + " " + doctor.lastname,
            value: doctor.id,
            email: doctor.email,
          };
        }),
      ]);
    },
  });

  const {
    isLoading: loadingPatients,
    isError: ispatientQueryError,
    error: patientQueryError,
  } = useQuery("patientQuery", fetchPatients, {
    onSuccess: (data) => {
      setPatientOptions([
        ...data.data.map((patient: any) => {
          return {
            label: patient.firstname + " " + patient.lastname,
            value: patient.id,
            email: patient.email,
          };
        }),
      ]);
    },
  });

  const { mutate, isLoading: fixingAppointment } = useMutation(fixAppointment, {
    onError: (err: any) => {
      message.error(err.response.data.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("appointmentsQuery");
      message.success(data.message);
      form.resetFields();
    },
  });

  const getDoctorSlots = async (doctorId: number) => {
    const response = await axios.get(`/doctor/appointment-slots/${doctorId}`);
    console.log([
      ...response.data.data.appointmentSlots.map((slot: any) => {
        return {
          label: `${dayjs(slot.from).get("hour")}:${
            dayjs(slot.from).get("minutes") || "00"
          } - ${dayjs(slot.to).get("hour")}:${
            dayjs(slot.to).get("minutes") || "00"
          }`,
          value: slot.from,
        };
      }),
    ]);

    setSlotOptions([
      ...response.data.data.appointmentSlots.map((slot: any) => {
        return {
          label: `${dayjs(slot.from).get("hour")}:${
            dayjs(slot.from).get("minutes") || "00"
          } - ${dayjs(slot.to).get("hour")}:${
            dayjs(slot.to).get("minutes") || "00"
          }`,
          value: slot.from,
        };
      }),
    ]);
  };

  // const { isLoading: gettingSlots, refetch } = useQuery({
  //   queryKey: ["slotsQuery"],
  //   queryFn: getDoctorSlots,
  //   // enabled: false,
  //   onSuccess: (slots) => {
  //     console.log(slots.appointmentSlots);
  //     setSlotOptions([
  //       ...slots.appointmentSlots.map((slot: any) => {
  //         return {
  //           label: `${dayjs(slot.from).get("hour")}:${
  //             dayjs(slot.from).get("minutes") || "00"
  //           } - ${dayjs(slot.to).get("hour")}:${
  //             dayjs(slot.to).get("minutes") || "00"
  //           }`,
  //           value: slot.from,
  //         };
  //       }),
  //     ]);
  //   },
  // });

  if (isDoctorsQueryError)
    return (
      <Alert
        type="error"
        message={(doctorsQueryError as any).response.data.message}
        banner
      />
    );

  if (ispatientQueryError) {
    if ((patientQueryError as any).response.status === 404)
      return (
        <Alert
          type="warning"
          message={"No patients are available."}
          action={
            <Button>
              <Link to="/reception/patient">Add one</Link>
            </Button>
          }
          banner
        />
      );

    return (
      <Alert
        type="error"
        message={(patientQueryError as any).response.data.message}
        banner
      />
    );
  }

  if (isDoctorsQueryError)
    return (
      <Alert
        type="error"
        message={(doctorsQueryError as any).response.data.message}
        banner
      />
    );

  if (loadingDoctors || loadingPatients) return <Skeleton active />;

  return (
    <section>
      <Typography.Title level={2}>Fix Appointment</Typography.Title>
      <Form
        name="fix-appointment"
        style={{ maxWidth: 600 }}
        layout="vertical"
        autoComplete="off"
        form={form}
        onSubmitCapture={() => mutate()}
      >
        <Row gutter={20}>
          <Col span={24} md={12}>
            <Form.Item
              hasFeedback
              label="Search patient"
              name="patientId"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Patient is required.",
                },
              ]}
            >
              <Select
                options={patientOptions}
                showSearch
                style={{ width: "100%" }}
                optionFilterProp="label"
                optionRender={(option) => (
                  <Space direction="vertical">
                    <Typography.Text>{option.data.label}</Typography.Text>
                    <Typography.Text type="secondary">
                      {option.data.email}
                    </Typography.Text>
                  </Space>
                )}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              hasFeedback
              label="Select doctor"
              name="doctorId"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Doctor is required.",
                },
              ]}
            >
              <Select
                options={doctorOptions}
                style={{ width: "100%" }}
                optionRender={(option) => (
                  <Space direction="vertical">
                    <Typography.Text>{option.data.label}</Typography.Text>
                    <Typography.Text type="secondary">
                      {option.data.email}
                    </Typography.Text>
                  </Space>
                )}
                onChange={(value) => getDoctorSlots(value)}
              />
            </Form.Item>
          </Col>

          {slotOptions.length > 0 && (
            <Col span={24}>
              <Form.Item
                hasFeedback
                label="Select slot"
                name="fixedDateTime"
                validateDebounce={1000}
                rules={[
                  {
                    required: true,
                    message: "Slot is required.",
                  },
                ]}
              >
                <Select options={slotOptions} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          )}

          <Col span={24}>
            <Form.Item
              hasFeedback
              label="Concern"
              name="concern"
              validateDebounce={1000}
              rules={[
                {
                  min: 5,
                  message: "Concern must have atleast 5 characters",
                },
                {
                  required: true,
                  message: "Concern is required.",
                },
              ]}
            >
              <TextArea placeholder="Eg. Headache with continuous vomitting." />
            </Form.Item>
          </Col>
        </Row>
        <Space>
          <Form.Item>
            <SubmitButton loading={fixingAppointment} form={form}>
              Fix Appointment
            </SubmitButton>
          </Form.Item>

          <Form.Item>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </section>
  );
};

export default FixAppoinment;
