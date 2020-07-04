import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function HomeBody() {
  const [test, setTest] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/test")
      .then((resp) => {
        console.log(resp.data);
        setTest(resp.data.message);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  });

  return <div>{test}</div>;
}
