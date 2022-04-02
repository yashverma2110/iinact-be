import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    list: {
      type: mongoose.Types.ObjectId,
      ref: "List",
      required: true,
    },
    remindAt: {
      type: String,
      required: true,
    },
    current: {
      type: String,
    },
    days: {
      type: [String],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
