import React, { useContext, useState, useReducer } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  IdcardOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AssignContext } from "../AssignContext";
import Overview from "./AdminOverview";
import Settings from "./AdminSettings";
import Users from "./AdminUsers";
import Welcome from "./AdminWelcome";
import "./Admin.css";

const { Header, Sider, Content } = Layout;

export default function Admin() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AssignContext);
  const [collapsed, setCollapsed] = useState(true);
  const [sideBar, dispatch] = useReducer(SidebarReducer, <Users />);

  const toggle = (e) => {
    // e.preventDefault();
    setCollapsed(!collapsed);
  };

  function SidebarReducer(state, action) {
    switch (action.type) {
      case "overview":
        return <Overview />;
      case "settings":
        return <Settings />;
      case "users":
        return <Users />;
    }
  }

  return (
    <div>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {/* <Menu.Item onClick={(e) => toggle(e)}>
              <span style={{ margin: "0em" }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </span>
            </Menu.Item> */}
            <Menu.Item
              key="2"
              icon={<UserOutlined />}
              onClick={(e) => {
                dispatch({ type: "overview" });
              }}
            >
              Overview
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<SettingOutlined />}
              onClick={(e) => {
                dispatch({ type: "settings" });
              }}
            >
              Settings
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<IdcardOutlined />}
              onClick={(e) => {
                dispatch({ type: "users" });
              }}
            >
              Users
            </Menu.Item>
          </Menu>
        </Sider>
        {/* <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              minHeight: 280,
            }}
          >
            {sideBar}
          </Content>
        </Layout> */}
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {sideBar}
            </div>
          </Content>
          <Layout.Footer></Layout.Footer>
        </Layout>
      </Layout>
    </div>
  );
}
