import express from 'express';
import { deleteUser, getAllUser, getsingleUser, updateUser } from '../controllers/userController.js';
const router = express.Router()

import { verifyAdmin, verifyUser } from '../utils/verifytoken.js';

// update user
router.put("/:id", verifyUser, updateUser);
// delete user
router.delete("/:id", verifyUser, deleteUser);
// get single user
router.get("/:id", verifyUser, getsingleUser);
// get all user
router.get("/", verifyAdmin, getAllUser);

export default router;