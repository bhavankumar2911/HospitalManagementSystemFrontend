import React from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Space,
  theme,
  Typography,
} from "antd";
import AppLayout from "../../components/app/AppLayout";

interface SubmitButtonProps {
  form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  children,
}) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

const navLinks = [{ key: "home", label: "Home" }];

const Admin: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();

  return (
    <AppLayout navItems={navLinks}>
      <Typography.Title level={2}>Add Roles</Typography.Title>
      <Form
        name="trigger"
        style={{ maxWidth: 600 }}
        layout="horizontal"
        autoComplete="off"
        form={form}
        onSubmitCapture={(e) => console.log(form.getFieldsValue())}
      >
        <Space style={{ alignItems: "flex-start" }}>
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
        </Space>
      </Form>
    </AppLayout>
  );
};

export default Admin;
