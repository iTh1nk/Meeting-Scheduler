import React from "react";
import { Select } from "antd";

export default function Users() {
  return (
    <div>
      <Select
        defaultValue="allUsers"
        style={{ width: "100%" }}
        // onChange={handleChange}
      >
        <Select.Option value="allUsers">All Users</Select.Option>
        <Select.Option value="addUser">Add User</Select.Option>
        <Select.Option value="deleteUser">Delete User</Select.Option>
      </Select>
    </div>
  );
}
