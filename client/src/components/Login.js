import React, { useContext, useState } from "react";
import { AssignContext } from "../AssignContext";
import { HomeOutlined } from "@ant-design/icons";
import "./Login.css";
import { Modal, Button, Form, Input, Alert } from "antd";
import Axios from "axios";

export default function Login() {
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
    };
    setConfirmLoading(true);
    Axios.post("/login", data)
      .then((resp) => {
        if (resp.data.message === "ok") {
          setIsAuthenticated(true);
          setErrorMessage("");
          window.localStorage.setItem("auth", "Bearer " + resp.data.token);
          setConfirmLoading(false);
          setVisible(false);
          window.location.reload();
        } else {
          setConfirmLoading(false);
          setErrorMessage(resp.data.message);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err.response);
          setConfirmLoading(false);
          setErrorMessage(err.response.data.message);
        }
      });
  };
  const onReset = () => {
    form.resetFields();
    setErrorMessage("");
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
        title="Login"
        visible={visible}
        onCancel={(e) => handleCancel(e)}
        footer={null}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Username field is required!",
              },
              {
                min: 3,
                message: "Minimum 3 characters required!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                e.preventDefault();
                setErrorMessage("");
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Password field is required!",
              },
              {
                min: 3,
                message: "Minimum 3 characters required!",
              },
            ]}
          >
            <Input.Password
              onChange={(e) => {
                e.preventDefault();
                setErrorMessage("");
              }}
            />
          </Form.Item>
          <Form.Item id="login-btn-group">
            <Button
              type="primary"
              ghost
              htmlType="submit"
              id="login-btn-submit"
              loading={confirmLoading}
            >
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset} id="login-btn-reset">
              Reset
            </Button>
          </Form.Item>
          {errorMessage ? (
            <Form.Item>
              <span className="errorMessage">{errorMessage}</span>
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
}
