const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectToDb = require("./config/db");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const categoryRoutes = require("./routes/category");
const contactRoutes = require("./routes/contact");
const orderRoutes = require("./routes/orders");
const productRoutes = require("./routes/products");
const feelingLuckyRoutes = require("./routes/feeling-lucky");
const paymentRoutes = require("./routes/payment");

require("dotenv").config();
cors({
  origin: "*",
});

const app = express();
app.disable("etag");

connectToDb(process.env.MONGO_URI);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/categories", categoryRoutes);
app.use("/contact-us", contactRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);
app.use("/feeling-lucky", feelingLuckyRoutes);
app.use("/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {});
