import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Account";

import "../Common/newitem.css";
import { createRoutine } from "./routinesApi";

const NewRoutine = () => {
  const navigate = useNavigate();
  const blankRoutine = { name: "", goal: "", isPublic: true };
  const [routine, setRoutine] = useState(blankRoutine);
  const { token, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (Object.is(isLoggedIn, false))
      navigate("/login");
  }, [isLoggedIn, navigate]);

  const handleCreateRoutine = async (event) => {
    event.preventDefault();

    try {
      event.preventDefault();
      const response = await createRoutine(token, routine);
      if (response) {
        navigate("/routines");
      } else {
        alert("Error creating routine, please try again!");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoutine((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return <>
    <h1 className="pageName">Create a new routine!</h1>
    <form className="createForm" onSubmit={handleCreateRoutine}>
      <input
        type="text"
        name="name"
        style={{ marginBottom: "1em" }}
        value={routine.name}
        placeholder="Name of New Routine"
        minLength="1"
        required
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="goal"
        value={routine.goal}
        placeholder="What is the goal?"
        minLength="1"
        required
        onChange={handleInputChange}
      />
      <br />
      <button style={{ marginTop: "1em" }} type="submit">Create</button>
    </form>
  </>
}

export default NewRoutine; 