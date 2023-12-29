import mongoose from "mongoose";
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "users" }
);

export default mongoose.model("User", UserSchema);
