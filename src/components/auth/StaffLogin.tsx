import { Button, Form, Input, message, Space, Typography } from "antd";
import SubmitButton from "../app/SubmitButton";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginStaff = async () => {
    const response = await axios.post("/login", form.getFieldsValue());

    return response.data;
  };

  const { mutate, isLoading } = useMutation(loginStaff, {
    onSuccess: (data) => {
      const staff = data.data;
      localStorage.setItem("token", staff.token);

      queryClient.invalidateQueries("authQuery");
      switch (staff.role) {
        // doctor
        case 0:
          navigate("/doctor");
          break;
        // receptionist
        case 2:
          navigate("/reception/patient");
          break;
        // admin
        case 4:
          navigate("/admin");
          break;
        default:
          break;
      }
    },
    onError: (err: any) => {
      console.log(err);
      message.error(err.response.data.message);
    },
  });

  return (
    <section>
      <Form
        name="trigger"
        style={{ maxWidth: 600, margin: "0 auto" }}
        layout="vertical"
        autoComplete="off"
        form={form}
        onSubmitCapture={() => mutate()}
      >
        <Typography.Title level={2}>Staff Login</Typography.Title>
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

export default StaffLogin;
