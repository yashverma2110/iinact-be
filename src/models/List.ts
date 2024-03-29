import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
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
