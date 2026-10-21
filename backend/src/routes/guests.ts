import { Router } from "express";
import Guest from "../models/Guest.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const guests = await Guest.find();

    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch guests" });
  }
});

router.post("/", async (req, res) => {
  try {
    const guest = await Guest.create(req.body);

    res.status(201).json(guest);
  } catch (error) {
    res.status(500).json({ message: "Could not create guest" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ message: "Could not update guest" });
  }
});

export default router;
