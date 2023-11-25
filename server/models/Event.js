import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
