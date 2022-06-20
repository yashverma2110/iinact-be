import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
