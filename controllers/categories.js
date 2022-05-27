const model = require("../models");
const uuidv4 = require("uuid/v4");
exports.getAllCategories = (req, res) => {
  model.categories
    .findAll()
    .then((categories) => {
      res.status(200).json({
        result: "ok",
        data: categories,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: "error",
        message: err.message,
      });
    });
};

exports.getCategoryById = (req, res) => {
  const categoryId = req.params.categoryId;
  if (!categoryId) {
    return res.status(400).json({
      result: "error",
      message: "Category id is required",
    });
  }
  model.categories
    .findOne({
      where: {
        id: categoryId,
      },
    })
    .then((category) => {
      if (!category) {
        return res.status(404).json({
          result: "error",
          message: "Category not found",
        });
      }
      res.status(200).json({
        result: "ok",
        data: category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: "error",
        message: err.message,
      });
    });
};

exports.createCategory = (req, res) => {
  const category = req.body;
  category.id = uuidv4();
  if (!category) {
    return res.status(400).json({
      result: "error",
      message: "Category is required",
    });
  }
  model.categories
    .create(category)
    .then((category) => {
      res.status(201).json({
        result: "ok",
        data: category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: "error",
        message: err.message,
      });
    });
};

exports.updateCategory = (req, res) => {
  const categoryId = req.body.id;
  const category = req.body;
  if (!categoryId) {
    return res.status(400).json({
      result: "error",
      message: "Category id is required",
    });
  }
  model.categories
    .findOne({
      where: {
        id: categoryId,
      },
    })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          result: "error",
          message: "Category not found",
        });
      }
      model.categories
        .update(category, {
            where: {
                id: categoryId,
                }})
        .then(() => {
          res.status(200).json({
            result: "ok",
            data: category,
          });
        })
        .catch((err) => {
          res.status(500).json({
            result: "error",
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        result: "error",
        message: err.message,
      });
    });
};

exports.deleteCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  if (!categoryId) {
    return res.status(400).json({
      result: "error",
      message: "Category id is required",
    });
  }
  model.categories
    .findOne({
      where: {
        id: categoryId,
      },
    })
    .then((category) => {
      if (!category) {
        return res.status(404).json({
          result: "error",
          message: "Category not found",
        });
      }
      category
        .destroy()
        .then(() => {
          res.status(200).json({
            result: "ok",
            data: category,
          });
        })
        .catch((err) => {
          res.status(500).json({
            result: "error",
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        result: "error",
        message: err.message,
      });
    });
};
