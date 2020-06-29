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
        <Formik
          initialValues={{ guid: "", gpin: "" }}
          validationSchema={Yup.object({
            irvineDataId: Yup.number()
              .typeError("This filed requires a number!")
              .positive("ID has to be a positive number!")
              .integer("ID has to be an integer!"),
            irvineDataDate: Yup.string()
              .required("Date is required!")
              .matches(
                /[0-1][0-9]\-[0-3][0-9]$/g,
                "Date format is invalid! (i.e. 01-23)"
              ),
            irvineDataConfirmed: Yup.number()
              .typeError("This filed requires a number!")
              .required("The number of confirmed cases is required!")
              .positive("Confirmed number has to be positive!")
              .integer("Confirmed number has to be an integer!"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            this.handleOnClickSubmit();
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
            <Form onSubmit={handleSubmit}>
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

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
              <br />
              <Button
                variant="outline-success"
                size="sm"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ marginLeft: "10px" }}
                onClick={(event) => {
                  this.handleOnClickReset(event);
                }}
              >
                Reset
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
