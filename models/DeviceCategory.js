const { model, Schema } = require("mongoose");

const deviceCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  type: {
    type: String,
    enum: ["Phone", "Laptop", "Tablet", "Desktop", "Wearable", "Other"],
    required: true,
  },
  brand: {
    type: String,
    required: true,
    maxlength: 100,
  },
  model: {
    type: String,
    required: true,
    maxlength: 100,
  },
  specifications: {
    type: Map,
    of: String,
    default: {},
  },
});

module.exports = model("DeviceCategory", deviceCategorySchema);
