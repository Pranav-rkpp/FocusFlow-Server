import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const Task = model("Task", taskSchema);

export default Task;
