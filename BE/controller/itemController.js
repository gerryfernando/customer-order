const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

dotenv.config();

class ItemController {
  static async getItem(req, res) {
    let response = {
      message: "",
      data: null,
      total: 0,
    };
    try {
      const items = await prisma.item.findMany();

      response.total = items.length;
      response.message = "Get list item success";
      response.data = items;
      res.status(200).json(response);
    } catch (error) {
      response.message = "error: " + error;
      res.status(500).json(response);
    }
  }

  static async createItem(req, res) {
    let response = {
      message: "",
      data: null,
    };
    try {
      const { orderCode, totalPrice, customerId, itemsId, quantity } = req.body;

      const newOrder = await prisma.order.create({
        data: {
          order_code: orderCode,
          total_price: BigInt(totalPrice),
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
      response.message = "Create item success";
      response.data = { id: newOrder };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Create item failed" });
    }
  }

  static async editItem(req, res) {
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
      response.message = "Edit item success";
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Edit item failed" });
    }
  }

  static async deleteItem(req, res) {
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
      response.message = "Delete item success";
      response.data = deletedItem;
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Delete item failed" });
    }
  }
}

module.exports = ItemController;
