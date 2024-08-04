import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  message,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import SubmitButton from "../app/SubmitButton";
import dayjs from "dayjs";
import axios, { AxiosError } from "axios";
import Role from "../../enums/Role";

const AddStaff = () => {
  const [form] = Form.useForm();
  const [staffRole, setStaffRole] = useState<number>();
  const [apiURL, setApiURL] = useState("/staff");
  const [savingStaff, setSavingStaff] = useState(false);

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
      const response = await axios.post(apiURL, data);

      message.success(response.data.message);
      form.resetFields();
      setSavingStaff(false);
      setApiURL("/staff");
      setStaffRole(undefined);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        message.error(error.response.data.message);
        setSavingStaff(false);
      }
    }
  };

  const getRoles = () => {
    const roles = [];

    for (const role in Role) {
      if (isNaN(Number(role))) {
        const roleValue = Role[role as keyof typeof Role];
        roles.push({
          value: roleValue,
          label: role,
        });
      }
    }

    return roles;
  };

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
              name="role"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Role is required.",
                },
              ]}
            >
              <Select
                onChange={(value) => {
                  if (value === 0) {
                    setStaffRole(value);
                    setApiURL("/doctor");
                  } else {
                    setStaffRole(value);
                    setApiURL("/staff");
                  }
                }}
                options={getRoles()}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          {/* only for doctor */}
          {staffRole === 0 ? (
            <>
              <Col span={24} md={12}>
                <Form.Item
                  hasFeedback
                  label="Doctor's Qualification"
                  name="qualification"
                  validateDebounce={1000}
                  rules={[
                    {
                      required: true,
                      message: "Qualification is required.",
                    },
                    {
                      min: 2,
                      message:
                        "Qualification must be atleast 2 characters long.",
                    },
                  ]}
                >
                  <Input placeholder="Eg. MBBS" />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item
                  hasFeedback
                  label="Doctor's Specialization"
                  name="specialization"
                  validateDebounce={1000}
                  rules={[
                    {
                      required: true,
                      message: "Specialization is required.",
                    },
                    {
                      min: 3,
                      message:
                        "Specialization must be atleast 3 characters long.",
                    },
                  ]}
                >
                  <Input placeholder="Eg. Dentist" />
                </Form.Item>
              </Col>
            </>
          ) : null}

          {/* only for doctor */}

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

        <Space>
          <Form.Item>
            <SubmitButton loading={savingStaff} form={form}>
              Add Staff
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

export default AddStaff;
