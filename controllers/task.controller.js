import Task from "../models/task.model.js";

export const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks) res.status(404).json({ message: "No Task Found" });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTaskById = async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  const task = {
    name: req.body.name,
  };

  try {
    const newTask = new Task(task);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTaskById = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOneAndUpdate({ _id }, req.body, { new: true });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTaskById = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
