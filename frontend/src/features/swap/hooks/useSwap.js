import { SwapContext } from "../swap.context";
import { useContext, useEffect } from "react";
import showToast from "../../../utils/Toastify.util.jsx";
import {
    fetchSwapRequests,
    cancelSwapRequest,
    completeSwapRequest,
    rejectSwapRequest,
    acceptSwapRequest,
    shipmentUpdateSwapRequest,
    changeShipmentTypeSwapRequest
} from "../service/swap.api";



const useSwap = () => {
    const {
        loading,
        userAllSwaps,
        filters,
        setLoading,
        setUserAllSwaps,
        setFilters,
    } = useContext(SwapContext)
    const getSwapRequests = async ({ filters }) => {
        try {
            setLoading(true);
            const swaps = await fetchSwapRequests({ filters });
            setUserAllSwaps(swaps);
        } catch (error) {
            console.error("Error fetching swap requests:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const acceptSwapHandler = async (swapId) => {
        try {
            setLoading(true);
            const response = await acceptSwapRequest(swapId);
            showToast(response.message, "success");
            getSwapRequests({ filters });
        } catch (error) {
            console.error("Error accepting swap request:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const rejectSwapHandler = async (swapId) => {
        try {
            setLoading(true);
            const response = await rejectSwapRequest(swapId);
            showToast(response.message, "success");
            getSwapRequests({ filters });
        } catch (error) {
            console.error("Error rejecting swap request:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const cancelSwapHandler = async (swapId) => {
        try {
            setLoading(true);
            const response = await cancelSwapRequest(swapId);
            showToast(response.message, "success");
            getSwapRequests({ filters });
        } catch (error) {
            console.error("Error canceling swap request:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const completeSwapHandler = async (swapId) => {
        try {
            setLoading(true);
            const response = await completeSwapRequest(swapId);
            showToast(response.message, "success");
            getSwapRequests({ filters });
        } catch (error) {
            console.error("Error completing swap request:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const shipmentUpdateSwapRequestHandler = async (swapId, shipmentDetails) => {
        try {
            setLoading(true);
            const response = await shipmentUpdateSwapRequest(swapId, shipmentDetails);
            showToast(response.message, "success");
            getSwapRequests({ filters });
        } catch (error) {
            console.error("Error updating shipment details for swap request:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const changeShipmentTypeSwapRequestHandler = async (swapId, changeTo) => {
        try {
            setLoading(true);
            const response = await changeShipmentTypeSwapRequest(swapId, changeTo);
            showToast(response.message, "success");
            getSwapRequests({ filters });
        } catch (error) {
            console.error("Error changing shipment type for swap request:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const fetch = async () => {
            await getSwapRequests({ filters });
        };
        fetch();
    }, []);
    return {
        getSwapRequests,
        acceptSwapHandler,
        rejectSwapHandler,
        cancelSwapHandler,
        completeSwapHandler,
        shipmentUpdateSwapRequestHandler,
        changeShipmentTypeSwapRequestHandler,
        loading,
        filters,
        userAllSwaps
    };
};

export default useSwap;
