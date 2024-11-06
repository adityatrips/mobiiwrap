const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        phoneBrand: {
          type: String,
          required: true,
        },
        phoneModel: {
          type: String,
          required: true,
        },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "pending",
    },
    payment: {
      type: String,
      enum: ["cod", "prepaid"],
      default: "cod",
      required: true,
    },
    paymentProof: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", OrderSchema);
