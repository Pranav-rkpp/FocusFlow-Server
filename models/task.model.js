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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Auth", // reference to the user model
    required: true,
  },
});

const Task = model("Task", taskSchema);

export default Task;
