const express = require("express");
const categoryRouter = express.Router();

const { getAllCategories, searchCategory, createCategory, deleteCategory, updateCategory  } = require("../controllers/categoryController");

categoryRouter.post("/new", createCategory)
categoryRouter.get("/get-all", getAllCategories)
categoryRouter.delete("/delete/:id", deleteCategory)
categoryRouter.get("/search", searchCategory)
categoryRouter.put("/update/:id", updateCategory)

module.exports = categoryRouter;
