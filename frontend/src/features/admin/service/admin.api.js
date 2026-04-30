import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/admin" || 'http://localhost:5000/api/admin';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Include cookies for authentication
});

const GetAllUsers = async () => {
    try {
        const response = await apiClient.get(`/users`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
const GetAllListings = async () => {
    try {
        const response = await apiClient.get(`/listings`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
const GetAllSwaps = async () => {
    try {
        const response = await apiClient.get(`/swaps`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
const GetAllDisputes = async () => {
    try {
        
        const response = await apiClient.get(`/disputes`);
      
        return response?.data
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
const GetPlatformAnalytics = async () => {
    try {
        const response = await apiClient.get(`/analytics`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
const BanOrUnbanUser = async (userId) => {
    try {
        const response = await apiClient.patch(`/user/${userId}`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
const RemoveOrRestoreListing = async (listingId) => {
    try {
        const response = await apiClient.patch(`/listing/${listingId}`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
const ResolveDispute = async (swapId, resolveData) => {
    try {
        const response = await apiClient.patch(`/swap/${swapId}`, resolveData);
        return response?.data
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
export { GetAllListings, GetAllDisputes, GetAllSwaps, GetAllUsers, GetPlatformAnalytics, BanOrUnbanUser, RemoveOrRestoreListing, ResolveDispute };