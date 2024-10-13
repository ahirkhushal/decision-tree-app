import express from "express";
import decisionTreeRoutes from "./routes/decisionTreeRoutes";

const app = express();

app.use(express.json());
app.use("/api", decisionTreeRoutes);

export default app;
