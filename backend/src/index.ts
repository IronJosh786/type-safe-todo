import dotenv from "dotenv";
import express from "express";

const app = express();

dotenv.config({ path: "./.env" });

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port: ", process.env.PORT);
});

export default app;
