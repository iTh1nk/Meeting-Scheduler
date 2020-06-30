import React, { useContext, useState } from "react";
import { AssignContext } from "../AssignContext";
import { HomeOutlined } from "@ant-design/icons";
import "./Signup.css";
import { Modal, Button, Form, Input, Alert } from "antd";
import Axios from "axios";
import { values } from "lodash";

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
          window.localStorage.setItem("auth", "Bearer " + resp.data.token);
          setConfirmLoading(false);
          setVisible(false);
        } else {
          setConfirmLoading(false);
          setErrorMessage(resp.data.message);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          setErrorMessage(err.response.data.message);
        }
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
            hasFeedback
            rules={[
              {
                required: true,
                message: "Username field is required!",
              },
              {
                min: 3,
                message: "Minimum 3 characters required!"
              }
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
            name="email"
            label="Email"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Email field is required!",
              },
              {
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email is not valid!"
              }
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
                message: "Minimum 3 characters required!"
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
          <Form.Item
            name="password2"
            label="Confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Two passwords don't match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password
              onChange={(e) => {
                e.preventDefault();
                setErrorMessage("");
              }}
            />
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
