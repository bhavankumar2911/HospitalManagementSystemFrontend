import {
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  message,
  Row,
  Select,
  Skeleton,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import SubmitButton from "../app/SubmitButton";
import dayjs from "dayjs";
import axios, { AxiosError } from "axios";

const AddStaff = () => {
  const [form] = Form.useForm();
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [roles, setRoles] = useState<APIRoleType[]>([]);
  const [savingStaff, setSavingStaff] = useState(false);

  useEffect(() => {
    axios
      .get("/role")
      .then((response) => {
        console.log(response);
        setLoadingRoles(false);
        setRoles([...response.data.data]);
      })
      .catch((err) => {
        console.log(err);
        setLoadingRoles(false);
      });
  }, []);

  const saveStaff = async (form: FormInstance) => {
    let data = form.getFieldsValue();
    data = {
      ...data,
      dateOfBirth: form.getFieldValue("dateOfBirth").toISOString(),
    };
    data = {
      ...data,
      dateOfJoining: form.getFieldValue("dateOfJoining").toISOString(),
    };

    try {
      setSavingStaff(true);
      const response = await axios.post("/staff", data);

      console.log(response.data);
      message.success(response.data.message);
      form.resetFields();
      setSavingStaff(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        message.error(error.response.data.message);
        setSavingStaff(false);
      }
    }
  };

  if (loadingRoles) return <Skeleton active />;

  if (roles.length == 0) return null;

  return (
    <section>
      <Typography.Title level={2}>Add Staff</Typography.Title>
      <Form
        name="trigger"
        style={{ maxWidth: 600 }}
        layout="vertical"
        autoComplete="off"
        form={form}
        onSubmitCapture={() => saveStaff(form)}
      >
        <Row gutter={20}>
          <Col span={24} md={12}>
            <Form.Item
              hasFeedback
              label="Firstname"
              name="firstname"
              validateDebounce={1000}
              rules={[
                {
                  min: 2,
                  message: "Firstname must have atleast 2 characters long.",
                },
                {
                  required: true,
                  message: "Firstname is required.",
                },
                {
                  pattern: /^[a-zA-Z ]*$/,
                  message:
                    "Firstname can have only lowercase letters and spaces.",
                },
              ]}
            >
              <Input placeholder="Eg. John" />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              hasFeedback
              label="Lastname"
              name="lastname"
              validateDebounce={1000}
              rules={[
                {
                  min: 2,
                  message: "Lastname must have atleast 2 characters long.",
                },
                {
                  required: true,
                  message: "Lastname is required.",
                },
                {
                  pattern: /^[a-zA-Z ]*$/,
                  message:
                    "Lastname can have only lowercase letters and spaces.",
                },
              ]}
            >
              <Input placeholder="Eg. Doe" />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              hasFeedback
              label="Email"
              name="email"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Email is required.",
                },
                {
                  pattern: /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                  message: "Email address is invalid.",
                },
              ]}
            >
              <Input placeholder="Eg. john@gmail.com" />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              hasFeedback
              label="Phone"
              name="phone"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Phone is required.",
                },
                {
                  pattern: /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/,
                  message:
                    "Enter phone number with country code eg. +91 1212121212",
                },
              ]}
            >
              <Input placeholder="Eg. +91 1212121212" />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              label="Date of joining"
              name="dateOfJoining"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Date of joining is required.",
                },
              ]}
            >
              <DatePicker minDate={dayjs()} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              label="Role"
              name="roleId"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Role is required.",
                },
              ]}
            >
              <Select
                // onChange={handleChange}
                options={roles.map((role) => ({
                  value: role.id,
                  label: role.roleName,
                }))}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Date of Birth is required.",
                },
              ]}
            >
              <DatePicker maxDate={dayjs()} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              label="Address"
              name="address"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Address is required.",
                },
              ]}
            >
              <Input.TextArea placeholder="Residential address" />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              label="Password"
              name="plainTextPassword"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Password is required.",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <SubmitButton loading={savingStaff} form={form}>
            Add Staff
          </SubmitButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default AddStaff;
