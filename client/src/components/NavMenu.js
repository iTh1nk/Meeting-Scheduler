import React, { useState, useContext } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import "./NavMenu.css";
import { AssignContext } from "../AssignContext";

export default function NavMenu() {
  const { isAuthenticated, setIsAuthenticated, loginUser } = useContext(
    AssignContext
  );
  const [current, setCurrent] = useState("mail");

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={(e) => handleClick(e)}
      selectedKeys={current}
      mode="horizontal"
      theme="light"
      id="navMenu"
    >
      <Menu.Item key="header">
        <a href="/">
          <img src="./favicon.ico" alt="Logo" className="logoTop" />
          Meeting Scheduler
        </a>
      </Menu.Item>
      {isAuthenticated ? (
        <Menu.Item key="admin">
          <a href="/admin" className="hrefColor">
            Admin
          </a>
        </Menu.Item>
      ) : (
        <Menu.Item key="login">
          <a href="/admin" className="hrefColor">
            Login
          </a>
        </Menu.Item>
      )}
      {isAuthenticated ? (
        <Menu.Item
          key="logout"
          onClick={(e) => {
            setIsAuthenticated(false);
            window.localStorage.removeItem("auth");
            window.location.replace("/");
          }}
        >
          <span className="logout">Logout </span>(
          <span style={{ color: "green" }}>{loginUser}</span>)
        </Menu.Item>
      ) : null}
    </Menu>
  );
}
