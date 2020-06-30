import React, { useContext, useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { AssignContext } from "../AssignContext";
import Login from "./Login";

const { Header, Sider, Content } = Layout;

export default function Admin() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AssignContext);
  const [collapsed, setCollapsed] = useState(true);

  const toggle = (e) => {
    e.preventDefault();
    setCollapsed(!collapsed);
  };

  if (!isAuthenticated) return <Login />;

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }}> */}
          <span className="trigger" onClick={(e) => toggle(e)}>
            {
              collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
              // {
              //   className: "trigger",
              //   onClick: (e) => toggle(e),
              // }
            }
          </span>
          {/* </Header> */}
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
