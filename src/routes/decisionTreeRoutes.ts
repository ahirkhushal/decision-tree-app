import { Router } from "express";
import { executeDecisionTree } from "../controllers/decisionTreeController";

const router = Router();

router.post("/decision-tree", executeDecisionTree);

export default router;
