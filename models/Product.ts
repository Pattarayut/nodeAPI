import mongoose from "mongoose";
const Schema = mongoose.Schema;

let ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "product" }
);

export default mongoose.model("Product", ProductSchema);
