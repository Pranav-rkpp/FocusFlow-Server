import { model, Schema } from "mongoose";

const authSchema = new Schema({
  userName: { type: String, require: true, trim: true, unique: true },
  password: { type: String, require: true },
});

export const Auth = model("Auth", authSchema);
