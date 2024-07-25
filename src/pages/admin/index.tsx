import React from "react";
import { Form, FormInstance, Input, message, Typography } from "antd";
import AppLayout from "../../components/app/AppLayout";
import SubmitButton from "../../components/app/SubmitButton";
import axios, { AxiosError } from "axios";

const navLinks = [{ key: "home", label: "Home" }];

const Admin: React.FC = () => {
  const [form] = Form.useForm();

  const addRole = async (e: React.FormEvent, form: FormInstance) => {
    const data = form.getFieldsValue();

    try {
      const response = await axios.post("/role", data.Role);

      console.log();

      message.success(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        message.error(error.response.data.message);
      }
    }
  };

  return (
    <AppLayout navItems={navLinks}>
      <Typography.Title level={2}>Add Roles</Typography.Title>
      <Form
        name="trigger"
        style={{ maxWidth: 600 }}
        layout="horizontal"
        autoComplete="off"
        form={form}
        onSubmitCapture={(e) => addRole(e, form)}
      >
        <Form.Item
          hasFeedback
          label="Role"
          name="Role"
          validateDebounce={1000}
          rules={[
            {
              min: 3,
              message: "A role must have atleast 3 characters long.",
            },
            {
              required: true,
              message: "Role is required.",
            },
            {
              pattern: /^[a-z]*$/,
              message: "A role can have only lowercase letters.",
            },
          ]}
        >
          <Input placeholder="Eg. doctor" />
        </Form.Item>
        <Form.Item>
          <SubmitButton form={form}>Add</SubmitButton>
        </Form.Item>
      </Form>
    </AppLayout>
  );
};

export default Admin;
