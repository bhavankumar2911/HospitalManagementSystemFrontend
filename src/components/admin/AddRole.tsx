import { Form, FormInstance, Input, message, Typography } from "antd";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import SubmitButton from "../app/SubmitButton";

function AddRole() {
  const [form] = Form.useForm();
  const [savingRole, setSavingRole] = useState(false);

  const addRole = async (e: React.FormEvent, form: FormInstance) => {
    const data = form.getFieldsValue();

    try {
      setSavingRole(true);
      const response = await axios.post("/role", data.Role);

      console.log();

      message.success(response.data.message);

      form.resetFields();
      setSavingRole(false);
    } catch (error) {
      setSavingRole(false);
      if (error instanceof AxiosError && error.response) {
        message.error(error.response.data.message);
      }
    }
  };

  return (
    <section>
      <Typography.Title level={2}>Add Roles</Typography.Title>
      <Form
        name="addStaff"
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
          <SubmitButton form={form} loading={savingRole}>
            Add Role
          </SubmitButton>
        </Form.Item>
      </Form>
    </section>
  );
}

export default AddRole;
