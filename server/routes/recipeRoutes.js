const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * App Routes
 */
router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesByID);
router.get('/details/:id', recipeController.exploreDetails);
router.post('/search', recipeController.searchRealEstate);
router.get('/submit-details', recipeController.submitDetails);
router.post('/submit-details', recipeController.submitDetailsOnPost);

module.exports = router;