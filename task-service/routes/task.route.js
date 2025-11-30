import express from "express";
import TaskController from "../controllers/task.controller.js";

const router = express.Router();

router.post("/tasks", TaskController.createTask);
router.get("/tasks", TaskController.getTasks);

export default router;
