import mongoose, { Schema } from "mongoose";

const guestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  portrait: {
    type: String,
    required: true,
  },
  stay: {
    type: Number,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    default: [],
  },
  preferences: {
    type: [String],
    default: [],
  },
  quote: {
    type: String,
    required: true,
  },
});

const Guest = mongoose.model("Guest", guestSchema);

export default Guest;
