import React, { useState } from "react";
import { Form, Button, Radio } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import Axios from "axios";

export default function AdminUserGroup(props) {
  const [updateGroup, setUpdateGroup] = useState(false);

  const onFinish = (values) => {
    let data = {
      group: values.updateGroupField,
    };
    Axios.put("/user/put/group/" + props.id, data, {
      headers: {
        Authorization: localStorage.getItem("auth"),
      },
    })
      .then((resp) => {
        setUpdateGroup(false);
        props.cb(!props.isClicked);
        console.log("User Group Updated!");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  return (
    <div>
      Super:{" "}
      {updateGroup ? (
        <Form
          name="updateGroup"
          layout="inline"
          onFinish={onFinish}
          initialValues={{
            updateGroupField: props.defaultShow,
          }}
        >
          <Form.Item name="updateGroupField" label="" rules={[]}>
            <Radio.Group>
              <Radio.Button value={0}>N</Radio.Button>
              <Radio.Button value={1}>Y</Radio.Button>
            </Radio.Group>
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
                setUpdateGroup(false);
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <span style={props.style}>
          {props.group}{" "}
          <EditTwoTone
            onClick={(e) => {
              e.preventDefault();
              setUpdateGroup(true);
            }}
          />
        </span>
      )}
    </div>
  );
}
