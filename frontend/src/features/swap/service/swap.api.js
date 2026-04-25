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
const fetchSwapRequests = async ({ filters }) => {
    try {
        const response = await apiClient.post(`/`, { filters });
        return response.data;
    } catch (error) {
        console.error('Error fetching swap requests:', error);
        throw error.response;
    }
}
const acceptSwapRequest = async (swapId) => {
    try {
        const response = await apiClient.patch(`/${swapId}/accept`);
        return response.data;
    } catch (error) {
        console.error('Error accepting swap request:', error);
        throw error.response;
    }
};
const rejectSwapRequest = async (swapId) => {
    try {
        const response = await apiClient.patch(`/${swapId}/reject`);
        return response.data;
    } catch (error) {
        console.error('Error rejecting swap request:', error);
        throw error.response;
    }
};
const cancelSwapRequest = async (swapId) => {
    try {
        const response = await apiClient.patch(`/${swapId}/cancel`);
        return response.data;
    } catch (error) {
        console.error('Error canceling swap request:', error);
        throw error.response;
    }
};
const completeSwapRequest = async (swapId) => {
    try {
        const response = await apiClient.patch(`/${swapId}/complete`);
        return response.data;
    } catch (error) {
        console.error('Error completeing swap request:', error);
        throw error.response;
    }
};
const shipmentUpdateSwapRequest = async (swapId, shipmentDetails) => {
    try {
        const response = await apiClient.patch(`/${swapId}/shipment`, { ...shipmentDetails });
        return response.data;
    } catch (error) {
        console.error('Error updating shipment details for swap request:', error);
        throw error.response;
    }
};
const changeShipmentTypeSwapRequest = async (swapId, changeTo) => {
    try {
        const response = await apiClient.patch(`/${swapId}/shipmentType`, { changeTo });
        return response.data;
    } catch (error) {
        console.error('Error changing shipment type for swap request:', error);
        throw error.response;
    }
};
export {
    createSwapRequest,
    fetchSwapRequests,
    acceptSwapRequest,
    rejectSwapRequest,
    cancelSwapRequest,
    completeSwapRequest,
    shipmentUpdateSwapRequest,
    changeShipmentTypeSwapRequest
};