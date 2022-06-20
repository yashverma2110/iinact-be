import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      requried: true,
    },
    list: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "List",
    },
    score: {
      type: Number,
      required: true,
    },
    reviewAgain: {
      type: Boolean,
      default: false,
    },
    remark: {
      type: String,
    },
    tag: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
