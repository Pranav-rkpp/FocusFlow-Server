import express from "express";
import {
  createTask,
  deleteTaskById,
  getAllTask,
  getTaskById,
  updateTaskById,
} from "../controllers/task.controller.js";
const taskRouter = express.Router();

// Tasks Route
taskRouter.get("/", getAllTask);

taskRouter.get("/:id", getTaskById);

taskRouter.post("/", createTask);

taskRouter.put("/:id", updateTaskById);

taskRouter.delete("/:id", deleteTaskById);

export default taskRouter;
