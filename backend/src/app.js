import express from "express";
import cors from "cors";
import complianceRoutes from "./routes/complianceRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/compliance", complianceRoutes);

export default app;