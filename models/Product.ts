import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        return value > 0;
      },
      message: "Price must be a positive number",
    },
  },
  deviceType: {
    type: String,
    required: true,
    enum: ["laptop", "phones", "tablet"],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

export default models.Product || model("Product", ProductSchema);
