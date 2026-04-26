import { useContext } from "react";
import { ListingContext } from "../listing.context";
import service from "../service/api.service";
import showToast from "../../../utils/Toastify.util";
import { createSwapRequest } from "../../swap/service/swap.api";

export const useListing = () => {
    // Access listing context values and functions
    const {
        allListings,
        setAllListings,
        userAllListings,
        setUserAllListings,
        page,
        setPage,
        totalPages,
        setTotalPages,
        loading,
        setLoading,
        filters,
        setFilters,
    } = useContext(ListingContext);

    const fetchListings = async (filters) => {
        setLoading(true);
        try {
            const data = await service.getListings(filters);

            setAllListings(data.listings);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching listings:', error);
        } finally {
            setLoading(false);
        }
    };
    const createListing = async (listingData) => {
        setLoading(true);
        try {
            const data = await service.createListing(listingData);
            showToast("Listing created successfully!", "success");
            await fetchListings(filters);
        } catch (error) {
            console.error('Error creating listing:', error);
            showToast(error?.response?.data?.message || "Error creating listing", "error");

        } finally {
            setLoading(false);
        }
    };
    const updateListing = async (listingId, listingData) => {
        setLoading(true);
        try {
            const data = await service.updateListing(listingId, listingData);
            showToast("Listing updated successfully!", "success");
        } catch (error) {
            console.error('Error updating listing:', error);
        } finally {
            setLoading(false);
        }
    };
    const getListingById = async (listingId) => {
        setLoading(true);
        try {
            const data = await service.getListingById(listingId);
            return data;
        } catch (error) {
            console.error('Error fetching listing by ID:', error);
        } finally {
            setLoading(false);
        }
    };
    const deleteListing = async (listingId) => {
        setLoading(true);
        try {
            const data = await service.deleteListing(listingId);
            fetchListings(filters);
            showToast("Listing deleted successfully!", "success");
        } catch (error) {
            console.error('Error deleting listing:', error);
        } finally {
            setLoading(false);
        }
    };
    const createSwap = async ({ offeredListingId, requestedListingId }) => {
        setLoading(true);
        try {
            const data = await createSwapRequest({ offeredListingId:offeredListingId, requestedListingId:requestedListingId });
            showToast("Swap created successfully!", "success");
        } catch (error) {
            showToast(error?.data?.message || error.message, "error");
            throw error;
        } finally {
            setLoading(false);
        }
    };
    return {
        // Handlers
        fetchListings,
        createListing,
        updateListing,
        getListingById,
        deleteListing,
        createSwap,

        //States
        allListings,
        loading
    };
};


