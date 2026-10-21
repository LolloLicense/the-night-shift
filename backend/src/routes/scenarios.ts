import { Router } from "express";
import Scenario from "../models/Scenario.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const scenarios = await Scenario.find().populate("guests");

    res.status(200).json(scenarios);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch scenarios" });
  }
});

router.get("/random/easy", async (req, res) => {
  try {
    const scenarios = await Scenario.find({ difficulty: "easy" });

    if (scenarios.length === 0) {
      return res.status(404).json({ message: "No easy scenarios found" });
    }

    const randomIndex = Math.floor(Math.random() * scenarios.length);

    const scenario = await Scenario.findById(
      scenarios[randomIndex]._id,
    ).populate("guests");

    res.status(200).json(scenario);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch random scenario" });
  }
});

router.post("/", async (req, res) => {
  try {
    const scenario = await Scenario.create(req.body);

    res.status(201).json(scenario);
  } catch (error) {
    res.status(500).json({ message: "Could not create scenario" });
  }
});

export default router;
