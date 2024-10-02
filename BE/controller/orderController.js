const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

dotenv.config();

class OrderController {
  static async getOrder(req, res) {
    let response = {
      message: "",
      data: null,
      total: 0,
    };
    try {
      const orders = await prisma.order.findMany({
        include: {
          customer: true, // Include related Customer
          items: true, // Include related Item
        },
      });

      response.total = orders.length;
      response.message = "Get list order success";
      response.data = orders;
      res.status(200).json(response);
    } catch (error) {
      response.message = "error: " + error;
      res.status(500).json(response);
    }
  }

  static async createOrder(req, res) {
    let response = {
      message: "",
      data: null,
    };
    try {
      const { orderCode, totalPrice, customerId, itemsId, quantity } = req.body;
      console.log(req.body);
      const newOrder = await prisma.order.create({
        data: {
          order_code: orderCode,
          total_price: totalPrice,
          customer: {
            connect: { customer_id: customerId },
          },
          items: {
            connect: { items_id: itemsId },
          },
          quantity,
        },
        include: {
          customer: true,
          items: true,
        },
      });
      response.message = "Create order success";
      response.data = { id: newOrder };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Create order failed" });
    }
  }

  static async editOrder(req, res) {
    let response = {
      message: "",
      data: null,
    };
    try {
      const orderId = parseInt(req.params.id, 10);
      const { quantity } = req.body;

      await prisma.order.update({
        where: { order_id: orderId },
        data: { quantity },
        include: {
          customer: true,
          items: true,
        },
      });
      response.message = "Edit order success";
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Edit order failed" });
    }
  }

  static async deleteOrder(req, res) {
    let response = {
      message: "",
      data: null,
    };
    try {
      const orderId = parseInt(req.params.id, 10);

      const deletedItem = await prisma.item.delete({
        where: { order_id: orderId },
        include: {
          customer: true,
          items: true,
        },
      });
      response.message = "Delete order success";
      response.data = deletedItem;
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Delete order failed" });
    }
  }
}

module.exports = OrderController;
