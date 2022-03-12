import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      requried: true,
    },
    public: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    urls: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);

export default List;
