import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./account.css";
import { AuthContext } from "./AuthProvider";

const Account = () => {
    const navigate = useNavigate();
    const { isLoggedIn, currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (Object.is(isLoggedIn, false))
            navigate("/login")
    }, [isLoggedIn, navigate]);

    return <>
        <h1 className="pageName">Account Page</h1>
        <h2 className="user-welcome"> Welcome {currentUser} </h2>
        <div className="acount-container">
            <div>
                <Link className="nav-link newPost" to="/routines/new">Make A New Routine</Link>
            </div>
            <div>
                <Link className="nav-link myRoutines" to="/routines">My Routines</Link>
            </div>
            <div>
                <Link className="nav-link newActivity" to="/activities/new">Create New Activity</Link>
            </div>
        </div>
        <div className="acount-container">
            <div>
                <Link className="nav-link myRoutines" to="/activities">Public Activities</Link>
            </div>

            <div>
                <Link className="nav-link myRoutines" to="/routines/public">Public Routines</Link>
            </div>
        </div>
    </>
}

export default Account;