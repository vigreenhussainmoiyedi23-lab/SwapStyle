import { useContext } from "react";
import { getUserAllListings, getUserData } from "../services/profile.api"
import { ProfileContext } from "../profile.context";
import { useEffect } from "react";


export const useProfile = () => {
    const {
        userAllListings,
        setUserAllListings,
        profileUser,
        setProfileUser,
        loading,
        setLoading,
    } = useContext(ProfileContext)
    const fetchUserAllListings = async (userId) => {
        setLoading(true)
        try {
            const response = await getUserAllListings(userId);
            setUserAllListings(response?.listings)
        } catch (error) {
            console.error('Error fetching user listings:', error);
            throw error;
        } finally {
            setLoading(false)
        }
    };
    const fetchUserData = async (userId) => {
        setLoading(true)
        try {
            const response = await getUserData(userId);
            setProfileUser(response?.userData)
        } catch (error) {
            console.error('Error fetching user listings:', error);
            throw error;
        } finally {
            setLoading(false)
        }
    };


    return { fetchUserAllListings, fetchUserData, userAllListings, profileUser, loading };
}


