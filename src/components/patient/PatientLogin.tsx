import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Space,
  Typography,
} from "antd";
import dayjs from "dayjs";
import SubmitButton from "../app/SubmitButton";
import { UseMutateFunction } from "react-query";

const PatientLogin = ({
  mutate,
  isLoading,
  form,
}: {
  mutate: UseMutateFunction<any, unknown, void, unknown>;
  isLoading: boolean;
  form: FormInstance<any>;
}) => {
  return (
    <section>
      <Form
        name="patientLogin"
        style={{ maxWidth: 600, margin: "0 auto" }}
        layout="vertical"
        autoComplete="off"
        form={form}
        onSubmitCapture={() => mutate()}
      >
        <Typography.Title level={2}>Patient Login</Typography.Title>
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

        <Form.Item
          hasFeedback
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

        <Space>
          <Form.Item>
            <SubmitButton loading={isLoading} form={form}>
              Login
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

export default PatientLogin;
