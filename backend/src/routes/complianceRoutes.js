import express from "express";
import { checkDocumentCompliance } from "../controllers/complianceController.js";

const router = express.Router();

router.post("/check", checkDocumentCompliance);

export default router;