import { useContext, useEffect } from "react";
import { fetchSwapRequests } from "../service/swap.api";
import { SwapContext } from "../swap.context";



const useSwap = () => {
    const {
        loading,
        userAllSwaps,
        filters,
        setLoading,
        setUserAllSwaps,
        setFilters,
    } = useContext(SwapContext)
    const getSwapRequests = async () => {
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
    useEffect(() => {
        const fetch = async () => {
            await getSwapRequests();
        };
        fetch();
    }, []);
    return {
        getSwapRequests,
        loading,
        filters,
        userAllSwaps
    };
};

export default useSwap;
