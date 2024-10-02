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
      const { itemName, itemCode, stock, price } = req.body;

      const newOrder = await prisma.item.create({
        data: {
          items_name: itemName,
          items_code: itemCode,
          stock,
          price,
          is_available: stock > 1 ? 1 : 0,
          last_re_stock: new Date(),
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
      const itemId = parseInt(req.params.id, 10);
      const { itemName, stock, price } = req.body;

      await prisma.item.update({
        where: { items_id: itemId },
        data: {
          items_name: itemName,
          stock,
          price,
          is_available: stock > 0 ? 1 : 0,
          last_re_stock: stock > 1 && new Date(),
          updatedAt: new Date(),
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
      const itemId = parseInt(req.params.id, 10);

      await prisma.item.delete({
        where: { items_id: itemId },
      });
      response.message = "Delete item success";
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Delete item failed" });
    }
  }
}

module.exports = ItemController;
