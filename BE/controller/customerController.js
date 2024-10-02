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
      const customers = await prisma.customer.findMany();

      response.total = customers.length;
      response.message = "Get list customer success";
      response.data = customers;
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
      const {
        customerAddress,
        customerCode,
        customerName,
        customerPhone,
        pic,
      } = req.body;

      const newOrder = await prisma.customer.create({
        data: {
          customer_name: customerName,
          customer_code: customerCode,
          customer_address: customerAddress,
          customer_phone: customerPhone,
          is_active: 1,
          pic,
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
      const customerId = parseInt(req.params.id, 10);
      const { customerAddress, customerName, customerPhone, pic } = req.body;

      await prisma.customer.update({
        where: { customer_id: customerId },
        data: {
          customer_name: customerName,
          customer_address: customerAddress,
          customer_phone: customerPhone,
          pic,
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
      const customerId = parseInt(req.params.id, 10);

      await prisma.customer.delete({
        where: { customer_id: customerId },
      });
      response.message = "Delete customer success";
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Delete customer failed" });
    }
  }
}

module.exports = CustomerController;
