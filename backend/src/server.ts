import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";
import guestRoutes from "./routes/guests.js";
import roomRoutes from "./routes/rooms.js";
import scenarioRoutes from "./routes/scenarios.js";

const app = express();
//middleware
app.use(express.json());
app.use(cors());
app.use(express.json());

app.use("/api/guests", guestRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/scenarios", scenarioRoutes);
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "The Night Shift API is running" });
});

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
