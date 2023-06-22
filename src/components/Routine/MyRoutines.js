import React, { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { deleteRoutine, getRoutines, updateRoutine } from "./routinesApi";
import { getUserRoutines } from "../Account/accountApi";
import { AuthContext } from "../Account";

import "./routines.css"

const RoutineCard = ({ routine, token, username, setReloadRequired }) => {

    const [editMode, setEditMode] = useState(false);
    const [showActivities, setShowActivities] = useState(false);
    const [routineData, setActivityData] = useState({
        name: routine.name,
        goal: routine.goal,
    });

    const handleEdit = (event) => {
        event.preventDefault();
        setEditMode(true);
    };

    const handleSave = async () => {
        await updateRoutine(token, routine.id, routineData);
        setEditMode(false);
        setReloadRequired(true);
    };

    const handleDelete = async () => {
        await deleteRoutine(token, routine.id);
        setReloadRequired(true);
    };

    const handleCancel = () => setEditMode(false);

    const handleShowActivities = () => setShowActivities(prev => !prev);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setActivityData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Only show edit button for user who created the routine
    const isUserAllowedAction = !editMode && routine.creatorName === username;
    const canShowActivities = !editMode && routine.activities.length > 0;

    return (
        <div className="routine-card animate__animated animate__fadeInLeft">
            <div>
                <span><b>Name: {'  '}</b></span>
                {editMode
                    ? <input name="name" type="text" value={routineData.name} onChange={handleInputChange} />
                    : <span>{routine.name.toUpperCase()}</span>}
            </div>
            <div>
                <span><b>Description:{'  '}</b></span>
                {editMode
                    ? <input name="goal" type="text" value={routineData.goal} onChange={handleInputChange} />
                    : <span>{routine.goal}</span>}
            </div>
            <div>
                <span><b>Created By:{'  '}</b></span>
                <span>{routine.creatorName}</span>
            </div>
            <div>
                <span><b>Total Activities:{'  '}</b></span>
                <span>{routine.activities?.length || 0}</span>
            </div>
            <hr />
            {showActivities &&
                <div>
                    <h4>Activities</h4>
                    {routine.activities && routine.activities.map(activity =>
                        <div key={activity.id}>
                            <span><b>Name:</b>{' '}{activity.name}</span> <br />
                            <span><b>Description:</b>{' '}{activity.description}</span>
                        </div>
                    )}
                </div>
            }

            {(isUserAllowedAction || editMode || canShowActivities) && (
                <div className="action-buttons">
                    {isUserAllowedAction && <button onClick={handleEdit}>Edit</button>}
                    {isUserAllowedAction && <button onClick={handleDelete}>Delete</button>}
                    {canShowActivities && <button onClick={handleShowActivities}>{showActivities ? 'Hide' : 'Show'} Activities</button>}
                    {editMode && (
                        <>
                            <button onClick={handleCancel}>Cancel</button>{' '}
                            <button onClick={handleSave}>Save</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};


const MyRoutines = ({ showPublicRoutines }) => {
    const [routines, setRoutines] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [reloadRequired, setReloadRequired] = useState(false);
    const searchTerm = searchParams.get("searchTerm")

    const navigate = useNavigate();
    const { token, currentUser, isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (Object.is(isLoggedIn, false))
            navigate("/login");
    }, [isLoggedIn, navigate]);


    useEffect(() => {
        const fetchRoutines = async () => {
            console.log({ token, currentUser });
            const response = showPublicRoutines
                ? await getRoutines()
                : await getUserRoutines(token, currentUser);
            setRoutines(response);
            setReloadRequired(false);
        };

        if (showPublicRoutines || (token && currentUser)) {
            fetchRoutines();
        }
    }, [showPublicRoutines, token, currentUser, reloadRequired]);

    const searchRoutines = (routine) => {
        const { name, goal } = routine;
        for (const field of [name, goal]) {
            if (field.toLowerCase().includes(searchTerm.toLowerCase())) {
                return true;
            }
        }
    }

    const handleSearch = (event) => {
        setSearchParams({ searchTerm: event.target.value })
    };

    const filteredRoutines = searchTerm
        ? routines.filter(searchRoutines)
        : routines;

    return <>
        <h1 className="pageName"> {showPublicRoutines ? 'Public' : 'My'} Routines! </h1>
        <div className="facilitate">
            <input
                className="searchbar"
                type="text"
                name="search"
                placeholder="Search Routines"
                value={searchTerm || ""}
                onChange={handleSearch}
            />
            <Link className="createLink" to="/routines/new">Create a New Routine</Link>
        </div>
        <div className="container-grid">
            {filteredRoutines &&
                filteredRoutines.map(routine => (
                    <RoutineCard
                        key={routine.id}
                        token={token}
                        routine={routine}
                        username={currentUser}
                        setReloadRequired={setReloadRequired}
                    />
                ))}
            {(searchTerm && (!filteredRoutines || !filteredRoutines.length)) && (
                <p>No routines</p>
            )}
        </div >
    </>
}

export default MyRoutines;