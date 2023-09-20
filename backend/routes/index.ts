import { Router } from "express";
import {
  testExecutor,
  healthCheck,
  createApi,
  getApiData,
  storeApiData,
  apiExecutor,
} from "../controller";

const router = Router();

router.get("/health-check", healthCheck);

router.post("/testExecute/*", testExecutor);

router.post("/api", createApi);

router.get("/api/data/:id", getApiData);

router.post("/api/data/:id", storeApiData);

router.post("/api/execute/:id/*", apiExecutor);

export default router;
