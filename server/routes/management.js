import express from "express";
import { getAdmins, getUserPerformace } from "../controllers/management.js";

const router = express.Router();

router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformace);

export default router;
