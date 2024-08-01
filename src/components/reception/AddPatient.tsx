import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import createDropdownOptions from "../../lib/app/createDropdownOptions";
import getGenderTypes from "../../lib/app/getGenderTypes";
import SubmitButton from "../app/SubmitButton";
import getBloodTypes from "../../lib/app/getBloodTypes";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";

const AddPatient = () => {
  const [form] = Form.useForm();
  const [collectMedicalHistory, setCollectMedicalHistory] = useState(false);
  const [savingPatient, setSavingPatient] = useState(false);

  const savePatient = async () => {
    const data = form.getFieldsValue();
    const medicalHistory = {
      preConditions: "",
      allergies: "",
    };

    if (collectMedicalHistory) {
      medicalHistory.preConditions = data.preConditions;
      medicalHistory.allergies = data.allergies;
    }

    data.medicalHistory = medicalHistory;
    data.gender = parseInt(data.gender);
    data.blood = parseInt(data.blood);
    delete data.preConditions;
    delete data.allergies;

    console.log(data);

    try {
      setSavingPatient(true);
      const response = await axios.post("/patient", data);

      message.success(response.data.message);
      form.resetFields();
      setSavingPatient(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        message.error(error.response.data.message);
        setSavingPatient(false);
      }
    }
  };

  return (
    <section>
      <Typography.Title level={2}>Add Patient</Typography.Title>
      <Form
        name="add-patient"
        style={{ maxWidth: 600 }}
        layout="vertical"
        autoComplete="off"
        form={form}
        onSubmitCapture={savePatient}
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
              hasFeedback
              label="Gender"
              name="gender"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Gender is required.",
                },
              ]}
            >
              <Select
                options={createDropdownOptions(getGenderTypes())}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              hasFeedback
              label="Blood type"
              name="blood"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Kindly select the blood type",
                },
              ]}
            >
              <Select
                options={createDropdownOptions(getBloodTypes())}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Space style={{ width: "100%", marginBottom: "1rem" }}>
            <Switch
              size="small"
              onChange={(checked) => setCollectMedicalHistory(checked)}
            />
            <Typography.Text>Has medical history?</Typography.Text>
          </Space>

          {collectMedicalHistory ? (
            <>
              <Col span={24} md={12}>
                <Form.Item
                  hasFeedback
                  label="Preconditions"
                  name="preConditions"
                  validateDebounce={1000}
                >
                  <Input placeholder="Eg. diabetes" />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item
                  hasFeedback
                  label="Allergies"
                  name="allergies"
                  validateDebounce={1000}
                >
                  <Input placeholder="Eg. milk, etc." />
                </Form.Item>
              </Col>
            </>
          ) : null}

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
        </Row>

        <Space>
          <Form.Item>
            <SubmitButton loading={savingPatient} form={form}>
              Add Patient
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

export default AddPatient;
