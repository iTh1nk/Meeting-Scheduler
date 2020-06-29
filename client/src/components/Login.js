import React, { useContext, useState } from "react";
import { AssignContext } from "../AssignContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { Modal, Button, Form, Input } from "antd";
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
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string(),
          password: Yup.string()
            .matches(
              /[0-1][0-9]\-[0-3][0-9]$/g,
              "Date format is invalid! (i.e. 01-23)"
            ),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          alert("Submitted!");
          setTimeout(() => {
            resetForm();
            setSubmitting(false);
          }, 2000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          isSubmitting,
        }) => (
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
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </Button>,
            ]}
          >
            <Form>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </Formik>
    </div>
  );
}
