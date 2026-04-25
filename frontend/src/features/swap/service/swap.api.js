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
    if (!offeredListingId || !requestedListingId) {
        throw new Error("Both offeredListingId and requestedListingId are required");
    }
    try {
        console.log(offeredListingId, requestedListingId, message)
        const response = await apiClient.post(`/${requestedListingId}`, { requesterListingId: offeredListingId, message: message || "" });
        return response.data;
    } catch (error) {
        console.error('Error creating swap request:', error);
        throw error.response;
    }
};
const fetchSwapRequests = async ({  filters }) => {
    try {
        const response = await apiClient.post(`/`, { filters });
        return response.data;
    } catch (error) {
        console.error('Error fetching swap requests:', error);
        throw error.response;
    }
}
export {
    createSwapRequest,
    fetchSwapRequests,
};