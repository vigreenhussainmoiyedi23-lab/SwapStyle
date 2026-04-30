import { useContext } from "react";
import { AdminContext } from "../admin.context";
import { GetAllListings, GetAllSwaps, GetAllUsers, GetPlatformAnalytics, BanOrUnbanUser, RemoveOrRestoreListing, ResolveDispute, GetAllDisputes } from "../service/admin.api";

export default function useAdmin() {
    const {
        users,
        setUsers,
        listings,
        setListings,
        swaps,
        setSwaps,
        disputes,
        setDisputes,
        loading,
        setLoading,
        analyticsTotal,
        setAnalyticsTotal,
        analyticsDaily,
        setAnalyticsDaily,
    } = useContext(AdminContext);
    const GetAllUsersHandler = async () => {
        setLoading(true);
        try {
            const response = await GetAllUsers();
            setUsers(response.users);
        } catch (error) {
            throw new Error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    const GetAllListingsHandler = async () => {
        setLoading(true);
        try {
            const response = await GetAllListings();
            setListings(response.listings);
        } catch (error) {
            throw new Error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    const GetAllSwapsHandler = async () => {
        setLoading(true);
        try {
            const response = await GetAllSwaps();
            setSwaps(response.swaps);
        } catch (error) {
            throw new Error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    const GetAllDisputesHandler = async () => {
        setLoading(true);
        try {
            const response = await GetAllDisputes();
            setDisputes(response.disputes);
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";

            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };
    const GetPlatformAnalyticsHandler = async () => {
        setLoading(true);
        try {
            const { data } = await GetPlatformAnalytics();
            console.log("platform analytics", data);
            setAnalyticsTotal(data.totals);
            setAnalyticsDaily(data.daily);
        } catch (error) {
            throw new Error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    const BanOrUnbanUserHandler = async (userId) => {
        setLoading(true);
        try {
            const response = await BanOrUnbanUser(userId);
            GetAllUsersHandler()
            return response;
        } catch (error) {
            throw new Error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    const RemoveOrRestoreListingHandler = async (listingId) => {
        setLoading(true);
        try {
            const response = await RemoveOrRestoreListing(listingId);
            GetAllListingsHandler()
            return response;
        } catch (error) {
            throw new Error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    const ResolveDisputeHandler = async (swapId, resolveData) => {
        setLoading(true);
        try {
            const response = await ResolveDispute(swapId, resolveData);
            return response;
        } catch (error) {
            throw new Error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    return {
        users,
        listings,
        swaps,
        disputes,
        loading,
        analyticsTotal,
        analyticsDaily,
        GetAllUsersHandler,
        GetAllListingsHandler,
        GetAllSwapsHandler,
        GetPlatformAnalyticsHandler,
        BanOrUnbanUserHandler,
        RemoveOrRestoreListingHandler,
        ResolveDisputeHandler,
        GetAllDisputesHandler
    }
}