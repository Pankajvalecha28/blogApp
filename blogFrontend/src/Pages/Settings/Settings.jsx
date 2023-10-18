import "./Settings.css";
import SideBar from "../../Components/SideBar/SideBar";

import { useContext, useState } from "react";
import { Context } from "../../context/Context.js";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      email: email || user.email,
      password: password || user.password,
    };

    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("file", file);
      updatedUser.profilepic = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
        setSuccess(true);
      } catch (err) {
        console.error("Error uploading image:", err);
        setSuccess(false);
      }
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/" + user._id,
        updatedUser
      );

      if (response.status === 200) {
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: response.data });
      } else {
        setSuccess(false);
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setSuccess(false);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settingswrapper">
        <div className="settingstitle">
          <span className="settingsupdatetitle">Update Your Account</span>
          <span className="settingsdeletetitle">Delete Account</span>
        </div>
        <form className="settingsform" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingspp">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilepic}
              alt=""
            />
            <label htmlFor="fileinput">
              <i className="settingsppicon fa-regular fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileinput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            style={{ cursor: "not-allowed" }} // Disable the input field
            readOnly
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingssubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{
                color: "green",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
}
