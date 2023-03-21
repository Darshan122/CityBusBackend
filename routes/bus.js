import express from 'express';

import { createBus, updateBus, deleteBus, getsingleBus, getAllBus, getBusBySearch, getFeaturedBus, getBusCount } from "./../controllers/busController.js";

const router = express.Router();
// create new bus
router.post("/", createBus);
// update bus
router.put("/:id", updateBus);
// delete bus
router.delete("/:id", deleteBus);
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
