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
    changeShipmentTypeSwapRequest,
    shipmentAddressApi,
    createDisputeApi,
    getSwapAllDisputeApi,
    createRatingApi
} from "../service/swap.api";



const useSwap = () => {
    const {
        loading,
        userAllSwaps,
        filters,
        swapAllDisputes,
        setLoading,
        setUserAllSwaps,
        setFilters,
        setSwapAllDisputes
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
            showToast("Make Sure You Negotiate Before Shipping or Completing", "info");
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
            showToast("The Swap Will Be Completed As Soon As The Other User completes it", "info");
            getSwapRequests({ filters });
        } catch (error) {
            console.error("Error completing swap request:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const shipmentDetailsHandler = async (swapId, shipmentDetails) => {
        try {
            setLoading(true);
            const response = await shipmentUpdateSwapRequest(swapId, shipmentDetails);
            showToast(response.message, "success");
            showToast("Before Completing Make Sure You receive the item", "info");
            getSwapRequests({ filters });
        } catch (error) {
            showToast(error.message, "error");
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const createDisputeHandler = async (swapId, disputeDetails) => {
        try {
            setLoading(true);
            const response = await createDisputeApi(swapId, disputeDetails);
            showToast(response.message, "success");
            getSwapRequests({ filters });
        } catch (error) {
            showToast(error.message, "error");
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const getSwapAllDisputesHandler = async (swapId) => {
        try {
            setLoading(true);
            const response = await getSwapAllDisputeApi(swapId);
            showToast(response.message, "success");
            getSwapRequests({ filters });
            setSwapAllDisputes(response.disputes);
        } catch (error) {
            console.error(error)
            showToast(error.data.message, "error");
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const shipmentAddressHandler = async (swapId, shipmentAddress) => {
        try {
            setLoading(true);
            const response = await shipmentAddressApi(swapId, shipmentAddress);
            showToast(response.message, "success");
            showToast("Add Tracking Number And Courier Id After Shipping", "info");
            getSwapRequests({ filters });
        } catch (error) {
            console.error("Error updating shipment details for swap request:", error);
            showToast(error.message, "error");
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const changeShipmentTypeHandler = async (swapId, changeTo) => {
        try {
            setLoading(true);
            const response = await changeShipmentTypeSwapRequest(swapId, changeTo);
            showToast(response.message, "success");
            if (changeTo === "local_swap") {
                showToast("Before Completing Make Sure You receive the item", "info");
            }
            getSwapRequests({ filters });
        } catch (error) {
            console.error("Error changing shipment type for swap request:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const createRatingHandler = async (swapId, ratingDetails) => {
        try {
            setLoading(true);
            const response = await createRatingApi(swapId, ratingDetails);
            showToast(response.message, "success");
            getSwapRequests({ filters });
        } catch (error) {
            console.error("Error creating rating for other user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }
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
        shipmentDetailsHandler,
        changeShipmentTypeHandler,
        shipmentAddressHandler,
        createDisputeHandler,
        getSwapAllDisputesHandler,
        createRatingHandler,
        loading,
        filters,
        userAllSwaps,
        swapAllDisputes
    };
};

export default useSwap;
