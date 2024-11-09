const Cart = require("../../models/Cart");

const quantiyUpdate = async (req, res) => {
  const { product, type, user } = req.body;
  console.log({
    product,
    type,
    user,
  });

  try {
    // Find the cart for the specific user
    const cart = await Cart.findOne({ user });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the specific item in the cart
    const itemIndex = cart.products.findIndex(
      (item) => item._id.toString() === product
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Get the item at the found index
    const item = cart.products[itemIndex];

    // Update the quantity based on the type
    if (type === "inc") {
      item.quantity += 1;
    } else if (type === "dec") {
      item.quantity -= 1;

      // Remove item from cart if quantity is zero or below
      if (item.quantity <= 0) {
        cart.products.splice(itemIndex, 1);
      }
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    // Recalculate total items and total cost after the update
    cart.totalItems = cart.products.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    cart.total = cart.products.reduce(
      (sum, item) => sum + item.quantity * item.cost,
      0
    );

    // Save the updated cart
    await cart.save();
    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = quantiyUpdate;
