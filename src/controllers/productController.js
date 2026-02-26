const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error al crear producto", error: err });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments();
    res.json({ total, page: parseInt(page), limit: parseInt(limit), data: products });
  } catch (err) {
    res.status(500).json({ message: "Error al obtener productos", error: err });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar producto", error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar producto", error: err });
  }
};