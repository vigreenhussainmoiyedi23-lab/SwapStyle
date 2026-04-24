import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/swaps" || 'http://localhost:5000/api/swaps';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Include cookies for authentication
});
const createSwapRequest = async ({ offeredListingId, requestedListingId, message }) => {
    try {
        const response = await apiClient.post(`/${requestedListingId}`, { requesterListingId: offeredListingId, message });
        return response.data;
    } catch (error) {
        console.error('Error creating swap request:', error);
        throw error;
    }
};

export  {
    createSwapRequest,
};