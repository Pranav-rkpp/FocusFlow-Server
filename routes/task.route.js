import express from "express";
import {
  createTask,
  deleteTaskById,
  getAllTask,
  getTaskById,
  updateTaskById,
} from "../controllers/task.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";
const taskRouter = express.Router();

// Tasks Route
taskRouter.get("/",verifyToken, getAllTask);

taskRouter.get("/:id", getTaskById);

taskRouter.post("/",verifyToken, createTask);

taskRouter.put("/:id",verifyToken, updateTaskById);

taskRouter.delete("/:id",verifyToken, deleteTaskById);

export default taskRouter;
