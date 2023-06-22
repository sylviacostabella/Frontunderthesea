import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getActivities, updateActivity } from './activitiesApi';
import { AuthContext } from "../Account";

import "./activities.css";

const ActivityCard = ({ activity, token, setReloadRequired }) => {

    const [editMode, setEditMode] = useState(false);
    const [activityData, setActivityData] = useState({
        name: activity.name,
        description: activity.description,
    });

    const handleEdit = (event) => {
        event.preventDefault();
        setEditMode(true);
    };

    const handleSave = async () => {
        await updateActivity(token, activity.id, activityData);
        setEditMode(false);
        setReloadRequired(true);
    };

    const handleCancel = () => setEditMode(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setActivityData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="activity-card animate__animated animate__fadeInLeft">
            <div>
                <span><b>Activity: {'  '}</b></span>
                {editMode
                    ? <input name="name" type="text" value={activityData.name} onChange={handleInputChange} />
                    : <span>{activity.name.toUpperCase()}</span>}
            </div>
            <div>
                <span><b>Description:{'  '}</b></span>
                {editMode
                    ? <input name="description" type="text" value={activityData.description} onChange={handleInputChange} />
                    : <span className="activity-description">{activity.description}</span>}
            </div>

            <div className="action-buttons">
                {!editMode && <button onClick={handleEdit}>Edit</button>}
                {editMode && (
                    <>
                        <button onClick={handleCancel}>Cancel</button>{' '}
                        <button onClick={handleSave}>Save</button>
                    </>
                )}
            </div>
        </div>
    );
};

const Activities = () => {


    const [activities, setActivities] = useState([]);
    const [reloadRequired, setReloadRequired] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("searchTerm");

    const { token, isLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();
    useEffect(() => {
        if (Object.is(isLoggedIn, false))
            navigate("/login");
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const fetchActivities = async () => {
            const data = await getActivities();
            setActivities(data);
            setReloadRequired(false);
        };

        fetchActivities();
    }, [reloadRequired]);

    const searchActivities = (activity) => {
        const { name, description } = activity;
        for (const field of [name, description]) {
            if (field.toLowerCase().includes(searchTerm.toLowerCase())) {
                return true;
            }
        }
    }

    const sortActivitiesByName = (a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }

        if (nameA > nameB) {
            return 1;
        }

        return 0;
    }

    const handleSearch = (event) => {
        setSearchParams({ searchTerm: event.target.value })
    };

    const filteredActivities = searchTerm
        ? activities.filter(searchActivities).sort(sortActivitiesByName)
        : activities.sort(sortActivitiesByName);

    return (
        <div style={{ margin: "2em" }}>
            <h1 className="pageName"> Activities </h1>
            <div className="facilitate">
                <input
                    className="searchbar"
                    type="text"
                    name="search"
                    placeholder="Search Activities"
                    value={searchTerm || ""}
                    onChange={handleSearch} />
                <Link style={{ marginLeft: "2em" }} className="createLink" to="/activities/new">Create a New Activity</Link>
            </div>
            <div className="container-grid">
                {filteredActivities &&
                    filteredActivities.map(activity => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                            token={token}
                            setReloadRequired={setReloadRequired}
                        />
                    ))}
                {(searchTerm && (!filteredActivities || !filteredActivities.length)) && (
                    <p>No activities</p>
                )}
            </div>
        </div>
    )
}

export default Activities;