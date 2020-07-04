import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import Axios from "axios";

export default function AdminUserEmail(props) {
  const [updateEmail, setUpdateEmail] = useState(false);

  const onFinish = (values) => {
    let data = {
      email: values.updateEmailField,
    };
    Axios.put("/api/user/put/email/" + props.id, data, {
      headers: {
        Authorization: localStorage.getItem("auth"),
      },
    })
      .then((resp) => {
        setUpdateEmail(false);
        props.cb(!props.isClicked);
        console.log("User Email Updated!");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  return (
    <div>
      Email:{" "}
      {updateEmail ? (
        <Form
          name="updateEmail"
          layout="inline"
          onFinish={onFinish}
          initialValues={{
            updateEmailField: props.defaultShow,
          }}
        >
          <Form.Item
            name="updateEmailField"
            label=""
            rules={[
              {
                required: true,
                message: "Email field is required!",
              },
              {
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email is not valid!",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="small">
              Confirm
            </Button>{" "}
            <Button
              type="secondary"
              htmlType="button"
              size="small"
              onClick={(e) => {
                e.preventDefault();
                setUpdateEmail(false);
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <span style={props.style}>
          {props.email}{" "}
          <EditTwoTone
            onClick={(e) => {
              e.preventDefault();
              setUpdateEmail(true);
            }}
          />
        </span>
      )}
    </div>
  );
}
