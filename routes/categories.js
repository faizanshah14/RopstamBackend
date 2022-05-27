const express = require('express');
const router = express.Router();
const categories = require('../controllers/categories');

router.get('/getAllCategories', categories.getAllCategories);
router.get('/getCategoryById/:categoryId', categories.getCategoryById);
router.post('/createCategory', categories.createCategory);
router.put('/updateCategory', categories.updateCategory);
router.delete('/deleteCategory/:categoryId', categories.deleteCategory);


module.exports = router;