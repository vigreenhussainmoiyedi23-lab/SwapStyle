import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/user" || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Include cookies for authentication
});


const getUserAllListings = async (userId) => {
    try {
        console.log("getting user")
        const response = await apiClient.get(`/listings/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user listings:', error);
        throw error;
    }
};
const getUserData = async (userId) => {
    try {
        const response = await apiClient.get(`/data/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export { getUserAllListings, getUserData };