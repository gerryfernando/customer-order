const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

dotenv.config();

class CustomerController {
  static async getCustomer(req, res) {
    let response = {
      message: "",
      data: null,
      total: 0,
    };
    try {
      const orders = await prisma.customer.findMany();

      response.total = orders.length;
      response.message = "Get list customer success";
      response.data = orders;
      res.status(200).json(response);
    } catch (error) {
      response.message = "error: " + error;
      res.status(500).json(response);
    }
  }

  static async createCustomer(req, res) {
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
      response.message = "Create customer success";
      response.data = { id: newOrder };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Create customer failed" });
    }
  }

  static async editCustomer(req, res) {
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
      response.message = "Edit customer success";
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Edit customer failed" });
    }
  }

  static async deleteCustomer(req, res) {
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
      response.message = "Delete customer success";
      response.data = deletedItem;
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Delete customer failed" });
    }
  }
}

module.exports = CustomerController;
