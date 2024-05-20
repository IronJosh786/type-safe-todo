import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { todoRouter } from "./routes/todo.route";

const app = express();

dotenv.config({ path: "./.env" });

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/v1/todo", todoRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port: ", process.env.PORT);
});

export default app;
