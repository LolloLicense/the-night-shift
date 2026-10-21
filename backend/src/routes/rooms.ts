import { Router } from "express";
import Room from "../models/Room.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch rooms" });
  }
});

router.post("/", async (req, res) => {
  try {
    const room = await Room.create(req.body);

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: "Could not create room" });
  }
});

export default router;
