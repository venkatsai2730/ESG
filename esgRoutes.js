// esgRoutes.js
const express = require('express');
const router = express.Router();
const { getEsgData } = require('../controllers/esgController');
const {  getEsgDatas } = require('../controllers/esgController');
const {  getEsgDatae } = require('../controllers/esgController');
const { getGaiaLensEsgData } = require('../controllers/esgController');



// Route to fetch ESG data from stock-swift API
router.get('/esg/stock-swift/', getEsgData);

// Route to fetch ESG data from stock-pluse API
router.get('/esg/stock-pluse/', getEsgDatas);

// Route to fetch ESG words analysis from FinancAI API
router.post('/esg/words-analysis', getEsgDatae);

// Route to fetch ESG news from GaiaLens API
router.get('/esg/gaialens/', getGaiaLensEsgData);

module.exports = router;
