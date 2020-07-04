import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import Axios from "axios";

export default function AdminUserPassword(props) {
  const [updatePassword, setUpdatePassword] = useState(false);

  const onFinish = (values) => {
    let data = {
      password: values.updatePasswordField,
    };
    Axios.put("http://localhost:3001/api/user/put/password/" + props.id, data, {
      headers: {
        Authorization: localStorage.getItem("auth"),
      },
    })
      .then((resp) => {
        setUpdatePassword(false);
        props.cb(!props.isClicked);
        console.log("User Password Updated!");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  return (
    <div>
      Password:{" "}
      {updatePassword ? (
        <Form name="updatePassword" layout="inline" onFinish={onFinish}>
          <Form.Item
            name="updatePasswordField"
            label=""
            rules={[
              {
                required: true,
                message: "Password field is required!",
              },
              {
                min: 3,
                message: "Password requires minimum 3 characters!",
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
                setUpdatePassword(false);
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <span style={props.style}>
          <EditTwoTone
            onClick={(e) => {
              e.preventDefault();
              setUpdatePassword(true);
            }}
          />
        </span>
      )}
    </div>
  );
}
