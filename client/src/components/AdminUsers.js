import React, { useReducer, useState, useEffect } from "react";
import { Select, Layout, Form, Input, Button } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import Awaiting from "./Awaiting";
import Axios from "axios";

const styles = {
  listStyle: {
    color: "darkgreen",
  },
};

export default function Users() {
  const [isClicked, setIsClicked] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [readUser, setReadUser] = useState([]);
  const [content, dispatch] = useReducer(contentReducer, "");

  function contentReducer(state, action) {
    switch (action.type) {
      case "addUser":
        return <AddUser />;
      case "updateUser":
        return <UpdateUser />;
    }
  }
  useEffect(() => {
    Axios.get("http://localhost:3001/api/user/read", {
      headers: {
        authorization: localStorage.getItem("auth"),
      },
    })
      .then((resp) => {
        setReadUser(resp.data.dbUser);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }, [isClicked]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    Axios.delete("http://localhost:3001/api/user/delete/" + id, {
      headers: {
        authorization: localStorage.getItem("auth"),
      },
    })
      .then((resp) => {
        console.log(resp.data.message);
        setIsClicked(!isClicked);
      })
      .catch((err) => {
        if (err) {
          console.log(err.response);
        }
      });
  };

  function AddUser() {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [form] = Form.useForm();

    const onFinish = (values) => {
      let data = {
        username: values.username,
        password: values.password,
        email: values.email,
        group: values.group,
      };
      setConfirmLoading(true);
      Axios.post("http://localhost:3001/api/signup", data)
        .then((resp) => {
          if (resp.data.message === "ok") {
            setConfirmLoading(false);
            setSuccessMessage("User Added!");
            setIsClicked(!isClicked);
            onReset();
          } else {
            setConfirmLoading(false);
            setErrorMessage(resp.data.message);
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
            setConfirmLoading(false);
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
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          initialValues={{
            username: "",
            email: "",
            password: "",
            password2: "",
            group: 0,
          }}
        >
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
                setSuccessMessage("");
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
                message: "Email is not valid!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                e.preventDefault();
                setErrorMessage("");
                setSuccessMessage("");
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
                setSuccessMessage("");
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
                  return Promise.reject("Passwords don't match!");
                },
              }),
            ]}
          >
            <Input.Password
              onChange={(e) => {
                e.preventDefault();
                setErrorMessage("");
                setSuccessMessage("");
              }}
            />
          </Form.Item>
          <Form.Item name="group" label="Group" hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              Submit
            </Button>{" "}
            <Button
              htmlType="button"
              style={{ marginLeft: "2em" }}
              onClick={onReset}
            >
              Reset
            </Button>
          </Form.Item>
          <span style={{ textAlign: "center" }}>
            {errorMessage ? (
              <Form.Item>
                <span className="errorMessage">{errorMessage}</span>
              </Form.Item>
            ) : null}
            {successMessage ? (
              <Form.Item>
                <span className="successMessage">{successMessage}</span>
              </Form.Item>
            ) : null}
          </span>
        </Form>
      </div>
    );
  }
  function UpdateUser() {
    return <div>Update User</div>;
  }

  const handleChange = (value) => {
    dispatch({ type: value });
  };

  if (isLoading) {
    return (
      <div>
        <Awaiting />
      </div>
    );
  }

  //************* MAIN *************
  return (
    <div>
      <Select
        defaultValue="All Users"
        style={{ width: "100%" }}
        onChange={(e) => handleChange(e)}
      >
        <Select.Option value="allUsers">All Users</Select.Option>
        <Select.Option value="addUser">Add User</Select.Option>
        <Select.Option value="updateUser">Update User</Select.Option>
      </Select>
      <Layout style={{ margin: "1.5em" }}>
        <span style={{ backgroundColor: "#fff" }}>{content}</span>
      </Layout>
      {readUser !== undefined
        ? readUser.map((item, idx) => (
            <div key={idx}>
              <h2>
                {item.username}{" "}
                <a
                  onClick={(e) => {
                    handleDelete(e, item._id);
                  }}
                >
                  <DeleteTwoTone />
                </a>
              </h2>
              <ul>
                <li>
                  Email: <span style={styles.listStyle}>{item.email}</span>
                </li>
                <li>
                  Super:{" "}
                  <span style={styles.listStyle}>
                    {item.group === 0 ? "No" : "Yes"}
                  </span>
                </li>
                <li>
                  Created At:{" "}
                  <span style={styles.listStyle}>{item.createdAt}</span>
                </li>
              </ul>
            </div>
          ))
        : "No Data"}
    </div>
  );
}
