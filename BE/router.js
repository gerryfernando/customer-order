const express = require("express");
const cors = require("cors");
const OrderController = require("./controller/orderController");
const { PrismaClient } = require("@prisma/client");
const ItemController = require("./controller/itemController");
const CustomerController = require("./controller/customerController");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Give access to folder public
app.use(express.static("public"));

app.get("/ping", async (req, res) => {
  res.status(200).send("pong");
});

//Order
app.get("/order", OrderController.getOrder);
app.post("/order", OrderController.createOrder);
app.put("/order/:id", OrderController.editOrder);
app.delete("/order/:id", OrderController.deleteOrder);

// Item
app.get("/item", ItemController.getItem);
app.post("/item", ItemController.createItem);
app.put("/item/:id", ItemController.editItem);
app.delete("/item/:id", ItemController.deleteItem);

//Customer
app.get("/customer", CustomerController.getCustomer);
app.post("/customer", CustomerController.createCustomer);
app.put("/customer/:id", CustomerController.editCustomer);
app.delete("/customer/:id", CustomerController.deleteCustomer);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

module.exports = app;
