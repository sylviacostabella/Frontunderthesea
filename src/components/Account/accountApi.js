const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

// Register a new user
export const registerUser = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Log in a user
export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

// Get the currently logged-in user's information
export const getLoggedInUser = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching user information:', error);
        throw error;
    }
};

// A utility function to check if the token is valid for the user
export const isUserLoggedIn = async (token, username) => {
    try {
        const response = await getLoggedInUser(token);
        return response.username === username;
    } catch (error) {
        console.error('Error fetching user information:', error);
        return false;
    }
};

// Get activity routines
export const getUserRoutines = async (token, username) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching activity routines:', error);
        throw error;
    }
};
