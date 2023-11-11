import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const UsersPage = () => {
  const path = useLocation();
  const { username } = useParams();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getUserData();
  }, [path]);

  async function getUserData() {
    await axios
      .get(`http://localhost:3002/v1/auth/users/${username}`, { withCredentials: true })
      .then((res) => {
        setMsg(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Not Found");
      });
  }

  return (
    <div>
      <h1 style={{ color: "green" }}>{msg}</h1>
    </div>
  );
};

export default UsersPage;
