import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  quiet: {
    type: Boolean,
    default: false,
  },
  smoking: {
    type: Boolean,
    default: false,
  },
  petFriendly: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    required: true,
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
