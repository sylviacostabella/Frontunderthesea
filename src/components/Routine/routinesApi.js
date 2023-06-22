const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

export const getRoutines = async () => {
    try {
        const response = await fetch(`${BASE_URL}/routines`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching routines:", error);
        return [];
    }
}

export const createRoutine = async (token, routineData) => {
    try {
        const response = await fetch(`${BASE_URL}/routines`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(routineData)
        });
        return response.ok;
    } catch (error) {
        console.error('Error creating routine:', error);
        return false;
    }
}

export const updateRoutine = async (token, routineId, routineData) => {
    try {
        const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(routineData)
        });
        return response.ok;
    } catch (error) {
        console.error(`Error updating routine with ID ${routineId}:`, error);
        return false;
    }
}

export const deleteRoutine = async (token, routineId) => {
    try {
        const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response.ok;
    } catch (error) {
        console.error(`Error deleting routine with ID ${routineId}:`, error);
    }
}

export const createRoutineActivity = async (routineId, activityData) => {
    try {
        const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activityData)
        });
        return response.ok;
    } catch (error) {
        console.error(`Error creating activity for routine ID ${routineId}:`, error);
    }
}
