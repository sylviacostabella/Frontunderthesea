import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Account";
import { createActivity } from "./activitiesApi";

import "../Common/newitem.css";

const NewActivity = () => {
  const navigate = useNavigate();
  const blankActivity = { name: "", description: "" };
  const [activity, setActivity] = useState(blankActivity);
  const { token, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (Object.is(isLoggedIn, false))
      navigate("/login");
  }, [isLoggedIn, navigate]);

  const handleCreateActivity = async (event) => {
    event.preventDefault();

    try {
      const response = await createActivity(token, activity);
      if (response) {
        navigate("/activities");
      } else {
        alert("Error creating activity, please try again!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setActivity((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return <>
    <h1 className="pageName">Create a new activity!</h1>
    <form className="createForm" onSubmit={handleCreateActivity}>
      <input
        type="text"
        name="name"
        style={{ marginBottom: "1em" }}
        value={activity.name}
        placeholder="Name of activity"
        minLength="1"
        required
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        value={activity.description}
        placeholder="Description of activity"
        minLength="1"
        required
        onChange={handleInputChange}
      />
      <br />
      <button style={{ marginTop: "1em" }} type="submit">Create Activity</button>
    </form>
  </>
}

export default NewActivity; 