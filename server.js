import express from "express";
import taskRouter from "./routes/task.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRouter from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT;

connectDB();

// 🚫 No-cache for API routes only
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

app.use(express.json());

app.use(cors());

app.use("/", authRouter);

app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Server Working");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
