const { Router } = require('express');
const router = Router();

const {

} = require('../controllers/admin.controller');

// ===== MANAGEMENT =====
// router.get("/users", );
// router.get("/listings", getAllListings);
// router.get("/swaps", getAllSwaps);

// // ===== ANALYTICS =====
// router.get("/users/analytics", getUserAnalytics);
// router.get("/listings/analytics", getListingAnalytics);
// router.get("/swaps/analytics", getSwapAnalytics);
// router.get("/platform/analytics", getPlatformAnalytics);

// // ===== ACTIONS =====
// router.patch("/user/:userId", updateUserStatus);       // ban/unban
// router.patch("/listing/:listingId", updateListingStatus); // remove/restore
// router.patch("/dispute/:disputeId", handleDispute);   // resolve/reject

module.exports = router;