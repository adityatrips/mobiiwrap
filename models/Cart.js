const { model, Schema } = require("mongoose");

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      phoneBrand: {
        type: String,
        required: true,
      },
      phoneModel: {
        type: String,
        required: true,
      },
      item: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      cost: {
        type: Number,
        required: true,
      },
    },
  ],
  totalItems: {
    type: Number,
    required: true,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

CartSchema.pre("save", function (next) {
  this.totalItems = this.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  this.total = this.products.reduce(
    (acc, product) => acc + product.quantity * product.cost,
    0
  );
  next();
});

module.exports = model("Cart", CartSchema);
