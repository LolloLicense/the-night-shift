import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import guestRoutes from "./routes/guests.js";

const app = express();
app.use(express.json());
app.use("/api/guests", guestRoutes);
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "The Night Shift API is running" });
});

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
