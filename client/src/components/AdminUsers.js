import React, { useReducer, useState, useEffect } from "react";
import { Select, Layout, Form, Input, Button, Skeleton } from "antd";
import Awaiting from "./Awaiting";
import Axios from "axios";

const styles = {
  listStyle: {
    color: "darkgreen",
  },
};

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [readUser, setReadUser] = useState([]);
  const [content, dispatch] = useReducer(contentReducer, "");

  function contentReducer(state, action) {
    switch (action.type) {
      case "allUsers":
        return <AllUsers />;
      case "addUser":
        return <AddUser />;
      case "deleteUser":
        return <DeleteUser />;
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
  }, []);

  function AllUsers() {
    return (
      <div>
        {readUser !== undefined
          ? readUser.map((item, idx) => (
              <div key={idx}>
                <h2>{item.username}</h2>
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
  function AddUser() {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
            window.localStorage.setItem("auth", "Bearer " + resp.data.token);
            setConfirmLoading(false);
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
                  return Promise.reject("Two passwords don't match!");
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
          <Form.Item style={{textAlign: "center"}}>
            <Button
              type="primary"
              htmlType="submit"
              loading={confirmLoading}
            >
              Submit
            </Button>{" "}
            <Button htmlType="button" style={{marginLeft: "2em"}} onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
          {errorMessage ? (
            <Form.Item>
              <span className="errorMessage">{errorMessage}</span>
            </Form.Item>
          ) : null}
        </Form>
      </div>
    );
  }
  function DeleteUser() {
    return <div>delete User</div>;
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
        defaultValue="Choose an option..."
        style={{ width: "100%" }}
        onChange={(e) => handleChange(e)}
      >
        <Select.Option value="allUsers">All Users</Select.Option>
        <Select.Option value="addUser">Add User</Select.Option>
        <Select.Option value="deleteUser">Delete User</Select.Option>
        <Select.Option value="updateUser">Update User</Select.Option>
      </Select>
      <Layout style={{ margin: "1.5em" }}>{content}</Layout>
    </div>
  );
}
