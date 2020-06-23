import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import "./NavMenu.css";

export default function NavMenu() {
  const [current, setCurrent] = useState("mail");

  const { SubMenu } = Menu;

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={(e) => handleClick(e)}
      selectedKeys={current}
      mode="horizontal"
      id="navMenu"
    >
      <Menu.Item key="header">
        <a href="/">
          <img src="./favicon.ico" alt="Logo" className="logoTop" />
          Meeting Scheduler
        </a>
      </Menu.Item>
      <SubMenu title="Admin">
        <Menu.ItemGroup title="Admin Group">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="User Group">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
}
