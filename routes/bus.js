import express from 'express';
import { verifyAdmin } from '../utils/verifytoken.js';

import { createBus, updateBus, deleteBus, getsingleBus, getAllBus, getBusBySearch, getFeaturedBus, getBusCount } from "./../controllers/busController.js";

const router = express.Router();
// create new bus
router.post("/", verifyAdmin, createBus);
// update bus
router.put("/:id", verifyAdmin, updateBus);
// delete bus
router.delete("/:id", verifyAdmin, deleteBus);
// get single bus
router.get("/:id", getsingleBus);
// get all bus
router.get("/", getAllBus);
// get bus by search
router.get("/search/getBusBySearch", getBusBySearch);
// get featured bus
router.get("/search/getFeaturedBus", getFeaturedBus);
// get bus count
router.get("/search/getBusCount", getBusCount);

export default router;
