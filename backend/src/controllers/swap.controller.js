const listingModel = require("../models/listing.model");
const changeHistoryModel = require("../models/swap/changeHistory.model");
const swapModel = require("../models/swap/swap.model");
const { getListingByIdService } = require("../services/listing/DBFunctions.service");
const { createSwapService } = require("../services/swap/swap.service");
const { getSwapByIdService, validateStateAndUser, validateSwapState, validateUserRole, ValidateSwap } = require("../services/swap/swap.utiliy");


async function createSwapHandler(req, res) {
    try {
        const { ownerListingId } = req.params
        const { requesterListingId, message } = req.body
        if (!ownerListingId || !requesterListingId) {
            return res.status(400).json({ message: "Both ownerListingId and requesterListingId are required", success: false })
        }
        const user = req.userId
        const ownerListing = await getListingByIdService(ownerListingId)
        const requestedListing = await getListingByIdService(requesterListingId)

        const response = await createSwapService(ownerListing, requestedListing, message, user)
        if (!response.success) return res.status(400).json({ message: response.message, success: false })
        res.status(201).json({
            swap: response.swap,
            message: "Swap request created",
            success: true
        })
    } catch (error) {
        if (error?.status) return res.status(error.status).json({ message: error.message, success: false })
        res.status(500).json({
            message: "Error creating swap",
            success: false
        })
    }
}

async function getUserSwapsHandler(req, res) {
    try {
        const user = req.userId
        const { filters } = req.body
        const { status, shipment_type, type, page, limit } = filters || {}
        let query = {}
        if (type === "sent") {
            query.requester = user
        } else if (type === "received") {
            query.owner = user
        } else {
            query = {
                $or: [
                    { requester: user },
                    { owner: user }
                ]
            }
        }
        if (status !== "all" && Array.isArray(status)) {
            query.status = { $in: status }
        } else if (status !== "all") {
            query.status = status
        }
        if (shipment_type !== "all") {
            query.shipment_type = shipment_type
        }
        const swaps = await swapModel.find(query).populate([
            {
                path: "requester",
                select: "rating profilePicture _id username email"
            },
            {
                path: "owner",
                select: "rating profilePicture _id username email"
            },
            {
                path: "requesterListing"
            },
            {
                path: "ownerListing"
            }
        ]).skip((page - 1) * limit).limit(limit).lean()
        let totalSwaps = await swapModel.countDocuments(query)
        let totalPages = Math.ceil(totalSwaps / limit)
        let swapWithRolesAndShipped = swaps.map(swap => {
            let role = null
            let hasShipped = swap.shipment_type == "local_swap" || !!swap.shipments.find(s => s.from.toString() === user.toString())
            
            if (swap.requester._id.toString() === user) {
                role = "requester"
            }
            if (swap.owner._id.toString() === user) {
                role = "owner"
            }
            let hasCompleted = swap.completedBy[role]
            return { ...swap, role, hasShipped,hasCompleted }
        })
        res.status(200).json({
            swaps: swapWithRolesAndShipped,
            totalSwaps,
            totalPages,
            message: "Swaps fetched",
            success: true
        })

    } catch (error) {
        if (error?.status) return res.status(error.status).json({ message: error.message, success: false })
        res.status(500).json({
            message: "Error fetching user's swap",
            success: false
        })
    }
}


async function getSingleSwapHandler(req, res) {
    try {
        const { swapId } = req.params
        const user = req.userId
        const swap = await getSwapByIdService(swapId)

        ValidateSwap(swap, user)
        if (swap.requester.toString() !== user && swap.owner.toString() !== user) {
            // neither requester nor owner
            return res.status(401).json({ message: "Unauthorized", success: false })
        }
        res.status(200).json({
            swap,
            message: "Swap fetched successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
        if (error.status) return res.status(error.status).json({ message: error.message, success: false })
        res.status(500).json({
            message: "Error fetching swap",
            success: false
        })
    }
}

//Swap status transition flow:
// pending -> accepted -> completed
// pending -> rejected
// pending -> cancelled

async function acceptSwapHandler(req, res) {
    try {
        const { swapId } = req.params
        const user = req.userId
        const swap = await getSwapByIdService(swapId)

        ValidateSwap(swap, user)
        validateSwapState(swap, "pending")
        validateUserRole(swap, user, "owner")

        swap.status = "accepted"
        await swap.save()

        res.status(200).json({
            message: "Swap accepted",
            success: true
        })

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({
            message: error.message || "Error accepting swap",
            success: false
        })
    }
}
async function rejectSwapHandler(req, res) {
    try {
        const { swapId } = req.params
        const user = req.userId
        const swap = await getSwapByIdService(swapId)

        ValidateSwap(swap, user)

        await validateSwapState(swap, "pending")
        await validateUserRole(swap, user, "owner")

        swap.status = "rejected"
        await swap.save()

        res.status(200).json({
            message: "Swap rejected",
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: error.message || "Error rejecting swap",
            success: false
        })
    }
}
async function cancelSwapHandler(req, res) {
    try {
        const { swapId } = req.params
        const user = req.userId
        const swap = await getSwapByIdService(swapId)

        validateUserRole(swap, user, "requester")
        ValidateSwap(swap, user)
        validateSwapState(swap, "pending")

        swap.status = "cancelled"
        await swap.save()

        res.status(200).json({
            message: "Swap cancelled",
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: error.message || "Error cancelling swap",
            success: false
        })
    }
}
async function completeSwapHandler(req, res) {
    try {
        const { swapId } = req.params
        const user = req.userId

        const swap = await getSwapByIdService(swapId)

        ValidateSwap(swap, user)
        validateSwapState(swap, "accepted")

        let hasShipped = swap.shipments.find(s => s.from.toString() === user)
        if (!hasShipped && swap.shipment_type === "shipping") {
            return res.status(400).json({ message: "First you should ship", success: false })
        }
        const role = swap.owner.toString() === user ? "owner" : "requester"

        swap.completedBy[role] = true
        await swap.save()
        if (swap.completedBy.owner && swap.completedBy.requester) {
            swap.status = "completed"
            await swap.save()
        }
        res.status(200).json({
            message: "Swap completed",
            success: true
        })

    } catch (error) {
        if (error?.status) return res.status(error.status).json({ message: error.message, success: false })
        res.status(500).json({
            message: error.message || "Error completing swap",
            success: false
        })
    }
}
async function shipmentDetailsHandler(req, res) {
    try {
        const { swapId } = req.params
        const user = req.userId
        const { courier, trackingId } = req.body
        if (swap.shipment_type === "local_swap") {
            return res.status(400).json({ message: "No shipment details needed for local swap", success: false })
        }
        const swap = await getSwapByIdService(swapId)
        ValidateSwap(swap, user)
        validateSwapState(swap, "accepted")
        const isShipmentExist = swap.shipments?.find(
            (shipment) => shipment.from.toString() === user
        )
        if (!swap.shipments || swap.shipments.length === 0) {
            swap.shipments = []
        }
        if (isShipmentExist) {
            isShipmentExist.courier = courier
            isShipmentExist.trackingId = trackingId
            swap.shipments = swap.shipments.map(s => s.from.toString() === user ? isShipmentExist : s)
            await swap.save()
            return res.status(200).json({
                message: "Shipment details updated",
                success: true
            })
        }
        swap.shipments.push({
            from: user,
            courier,
            trackingId
        })

        await swap.save()

        res.status(200).json({
            message: "Shipment details updated",
            success: true
        })
    } catch (error) {
        if (error?.status) return res.status(error.status).json({ message: error.message, success: false })
        res.status(500).json({
            message: "Error updating shipment details for swap",
            success: false
        })
    }
}
async function changeShipmentTypeHandler(req, res) {
    try {
        const { swapId } = req.params
        const user = req.userId
        const { changeTo } = req.body
        if (!["local_swap", "shipping"].includes(changeTo)) {
            return res.status(400).json({ message: "Invalid shipment type", success: false })
        }

        const swap = await getSwapByIdService(swapId)
        ValidateSwap(swap, user)
        validateSwapState(swap, "accepted")
        let { owner, requester } = swap.completedBy
        if (owner || requester) {
            return res.status(400).json({ message: "Swap already completed By one of the users", success: false })
        }
        swap.shipment_type = changeTo
        const changeHistory = await changeHistoryModel.create({
            changedBy: user,
            changeType: "shipment_type_update",
            previousValue: swap.shipment_type,
            newValue: changeTo
        })
        swap.changeHistory.push(changeHistory._id)

        await swap.save()

        res.status(200).json({
            message: "Shipment Type updated",
            success: true
        })
    } catch (error) {
        if (error?.status) return res.status(error.status).json({ message: error.message, success: false })
        res.status(500).json({
            message: "Error updating shipment Type for swap",
            success: false
        })
    }
}


module.exports = {
    createSwapHandler,
    getUserSwapsHandler,
    getSingleSwapHandler,
    acceptSwapHandler,
    rejectSwapHandler,
    cancelSwapHandler,
    completeSwapHandler,
    shipmentDetailsHandler,
    changeShipmentTypeHandler
}

/*  Read the comments for better understanding of my 
swap controllers as i will forget their usecase soon -Hussain


--> create swap comments
   - first get requested listing id from params and offered listing id from body
   - then fetch both listings from db
   - check if both listings exist else return error
   - check user is not trying to swap his own listing
   - check offered listing actually belongs to the logged-in user
   - (optional) check if requested listing is already in an active swap (avoid conflicts)
   - create a new swap with requester, owner, requestedListing, offeredListing
   - set initial status as PENDING
   - save swap in db
   - return success response with swap object


--> get user swaps comments
   - get logged-in user id
   - check query type (sent / received)
   - if type is sent → fetch swaps where requester = user
   - if type is received → fetch swaps where owner = user
   - else fetch both (sent + received)
   - return all swaps


--> get single swap comments
   - get swapId from params
   - fetch swap from db
   - if swap not found return error
   - check if logged-in user is either requester or owner
   - if not authorized return error
   - return swap details


--> accept swap comments
   - get swapId from params
   - fetch swap from db
   - if swap not found return error
   - check if logged-in user is the owner (only owner can accept)
   - check if swap status is PENDING
   - update status to ACCEPTED
   - save swap
   - return success response


--> reject swap comments
   - get swapId from params
   - fetch swap from db
   - if swap not found return error
   - check if logged-in user is the owner
   - check if swap status is PENDING
   - update status to REJECTED
   - save swap
   - return success response


--> cancel swap comments
   - get swapId from params
   - fetch swap from db
   - if swap not found return error
   - check if logged-in user is requester (only requester can cancel)
   - check if swap status is still PENDING
   - update status to CANCELLED
   - save swap
   - return success response


--> complete swap comments
   - get swapId from params
   - fetch swap from db
   - if swap not found return error
   - check if logged-in user is either requester or owner
   - check if swap status is ACCEPTED (must be accepted before completion)
   - update status to COMPLETED
   - save swap
   - return success response


--> shipment details comments
   - get swapId from params
   - fetch swap from db
   - if swap not found return error
   - check if logged-in user is part of swap (requester or owner)
   - get courier and trackingId from body
   - initialize shipment array if not present
   - push new shipment object with user, courier, trackingId
   - save swap
   - return success response

*/