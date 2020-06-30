import React, { useContext, useState } from "react";
import { AssignContext } from "../AssignContext";
import { HomeOutlined } from "@ant-design/icons";
import "./Signup.css";
import { Modal, Button, Form, Input, Alert } from "antd";
import Axios from "axios";

export default function Signup() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AssignContext);
  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCancel = (e) => {
    e.preventDefault();
    setVisible(false);
    window.location.replace("/");
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    let data = {
      username: values.username,
      password: values.password,
      email: values.email,
    };
    setConfirmLoading(true);
    Axios.post("http://localhost:3001/api/signup", data)
      .then((resp) => {
        if (resp.data.message === "ok") {
          setIsAuthenticated(true);
          window.localStorage.setItem("auth", "LoggedIn");
          setConfirmLoading(false);
          setVisible(false);
        } else {
          setConfirmLoading(false);
          setErrorMessage(resp.data.message);
        }
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };
  const onReset = () => {
    form.resetFields();
  };
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 17,
    },
  };

  return (
    <div>
      <Modal
        title="Signup"
        visible={visible}
        onCancel={(e) => handleCancel(e)}
        footer={null}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Valid username is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Valid email is required!",
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Valid password is required!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item id="signup-btn-group">
            <Button
              type="primary"
              htmlType="submit"
              id="signup-btn-submit"
              loading={confirmLoading}
            >
              Submit
            </Button>{" "}
            <Button htmlType="button" onClick={onReset} id="signup-btn-reset">
              Reset
            </Button>
            <span className="errorMessage">{errorMessage}</span>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
