import { Router } from "express";
import { testExecutor, healthCheck } from "../controller";

const router = Router();

router.get("/health-check", healthCheck);

router.post("/testExecute/*", testExecutor);

export default router;
