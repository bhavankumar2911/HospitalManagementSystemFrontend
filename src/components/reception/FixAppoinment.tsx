import {
  Button,
  Col,
  Form,
  Input,
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
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import SubmitButton from "../app/SubmitButton";
import { Link } from "react-router-dom";

const FixAppoinment = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [doctorOptions, setDoctorOptions] = useState<DefaultOptionType[]>([]);
  const [patientOptions, setPatientOptions] = useState<DefaultOptionType[]>([]);

  const fetchDoctorsWithLeastAppointments = async () => {
    const response = await axios.get("/doctors/least-appointments");
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

  const { isLoading: loadingDoctors } = useQuery(
    "doctorsQuery",
    fetchDoctorsWithLeastAppointments,
    {
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
    }
  );

  const { isLoading: loadingPatients } = useQuery(
    "patientQuery",
    fetchPatients,
    {
      onSuccess: (data) => {
        console.log(data);

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
    }
  );

  const { mutate, isLoading: fixingAppointment } = useMutation(fixAppointment, {
    onError: (err: any) => {
      console.log(err);
      message.error(err.response.data.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("appointmentsQuery");
      message.success(data.message);
      form.resetFields();
    },
  });

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
              {/* <Typography.Link>
                <Link to="/reception/patient">Patient not found? Add new</Link>
              </Typography.Link> */}
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
              />
            </Form.Item>
          </Col>

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
