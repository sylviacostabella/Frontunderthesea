const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

export const getActivities = async () => {
    try {
        const response = await fetch(`${BASE_URL}/activities`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
};

export const createActivity = async (token, activityData) => {
    try {
        const response = await fetch(`${BASE_URL}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(activityData),
        });
        return response.ok;
    } catch (error) {
        console.error('Error creating activity:', error);
        return false;
    }
};

export const updateActivity = async (token, activityId, activityData) => {
    try {
        const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(activityData),
        });
        return response.ok;
    } catch (error) {
        console.error(`Error updating activity with ID ${activityId}:`, error);
        return false;
    }
};

export const getRoutinesFeaturingActivity = async (activityId) => {
    try {
        const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result
    } catch (error) {
        console.error("Error fetching activity routines", error);
        return [];
    }
}
