import { Router } from "express";
import { executor, healthCheck } from "../controller";

const router = Router();

router.get("/health-check", healthCheck);

router.post("/execute", executor);

export default router;
