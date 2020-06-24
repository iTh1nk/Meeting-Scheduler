import React, { useContext, useState } from "react";
import { AssignContext } from "../AssignContext";
import { Modal, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AssignContext);
  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = (e) => {
    e.preventDefault();
    setConfirmLoading(true);

    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      setIsAuthenticated(true);
      window.localStorage.setItem("auth", "LoggedIn");
    }, 2000);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setVisible(false);
    window.location.replace("/");
  };

  return (
    <div>
      <Modal
        title="Login"
        visible={visible}
        onOk={(e) => handleOk(e)}
        confirmLoading={confirmLoading}
        onCancel={(e) => handleCancel(e)}
        footer={[
          <Button
            key="back"
            icon={<HomeOutlined />}
            onClick={(e) => handleCancel(e)}
          >
            Home
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={(e) => handleOk(e)}
          >
            Login
          </Button>,
        ]}
      >
        Login Form Display
      </Modal>
    </div>
  );
}
