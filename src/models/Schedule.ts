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
