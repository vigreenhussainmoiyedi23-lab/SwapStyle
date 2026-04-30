const { Router } = require('express');
const router = Router();

const { } = require('../controllers/admin.controller');

router.get("/users", () => { })
router.get("/listings", () => { })
router.get("/swaps", () => { })

router.get("/users/analytics", () => { })
router.get("/listings/analytics", () => { })
router.get("/swaps/analytics", () => { })
router.get("/platform/analytics", () => { })

router.patch("/user/:userId", () => { }) //ban/unban a user
router.patch("/listing/:listingId", () => { }) //remove a listing
router.patch("/dispute/:disputeId", () => { }) //resolve/reject a dispute

module.exports = router;