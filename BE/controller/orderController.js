const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const PDFDocument = require("pdfkit");
const moment = require("moment");
const prisma = new PrismaClient();

dotenv.config();

class OrderController {
  static async downladPdf(req, res) {
    try {
      const order = await prisma.order.findMany({
        include: {
          customer: true,
          items: true,
        },
      });
      const tableTop = 125; // Starting position of the table (y-axis)
      const itemSpacing = 30; // Space between rows

      const doc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=order_${order.order_id}.pdf`
      );

      doc.pipe(res);

      doc.fontSize(20).text("Order Details", { align: "center" });

      // Table headers
      doc
        .fontSize(12)
        .text("No", 50, tableTop)
        .text("Order Code", 100, tableTop)
        .text("Order Date", 200, tableTop)
        .text("Total Price", 300, tableTop)
        .text("Customer", 400, tableTop)
        .text("Item", 500, tableTop);

      doc
        .moveTo(50, tableTop + 20)
        .lineTo(600, tableTop + 20)
        .stroke(); // Table header underline

      // Your order data (example)
      order.forEach((val, index) => {
        const y = tableTop + 30 + index * itemSpacing;

        doc
          .fontSize(10)
          .text(index + 1, 50, y)
          .text(val.order_code, 100, y)
          .text(moment(val.order_date).format("DD-MM-YYYY HH:mm"), 200, y)
          .text(`Rp. ${val.total_price}`, 300, y)
          .text(val.customer.customer_name, 400, y)
          .text(val.items.items_name, 500, y);

        doc
          .moveTo(50, y + 20)
          .lineTo(600, y + 20)
          .stroke(); // Draw a line under each row
      });

      doc.end();
    } catch (error) {
      res.status(500).json({ message: "Download order failed" });
    }
  }

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
      const { quantity, totalPrice } = req.body;

      await prisma.order.update({
        where: { order_id: orderId },
        data: {
          quantity,
          total_price: totalPrice,
          updatedAt: new Date(),
        },
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
      const orderId = parseInt(req.params.id);

      await prisma.order.delete({
        where: { order_id: orderId },
        include: {
          customer: true,
          items: true,
        },
      });
      response.message = "Delete order success";
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Delete order failed" });
    }
  }
}

module.exports = OrderController;
