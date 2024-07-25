import { ReactNode } from "react";
import { Layout, Menu, theme, Typography } from "antd";
import Logo from "./Logo";
import { MenuOutlined } from "@ant-design/icons";
import { MenuItemType } from "antd/es/menu/interface";

const { Header, Content } = Layout;

const AppLayout = ({
  navItems,
  pageTitle,
  children,
}: {
  navItems: MenuItemType[];
  pageTitle?: string;
  children: ReactNode;
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: " 0 5%",
        }}
      >
        <Logo />
        <Menu
          theme="dark"
          mode="horizontal"
          items={navItems}
          style={{ flex: 1, minWidth: 0 }}
          overflowedIndicator={<MenuOutlined style={{ fontSize: "1.5rem" }} />}
        />
      </Header>
      <Content style={{ padding: "1rem 5%" }}>
        <div
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "85vh",
            padding: "1rem 2rem",
          }}
        >
          {!!pageTitle ? (
            <Typography.Title level={2}>{pageTitle}</Typography.Title>
          ) : null}
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
