import mongoose, { Schema } from "mongoose";

const scenarioSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  guests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
  ],
  briefing: {
    type: String,
    required: true,
  },
});

const Scenario = mongoose.model("Scenario", scenarioSchema);

export default Scenario;
