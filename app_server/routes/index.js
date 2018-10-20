var express = require('express');
var router = express.Router();
var ctrlMain = require ('../controllers/main');
var ctrllearninghub = require('../controllers/learninghub');
var ctrlreporttool = require('../controllers/reporttool');

// route for the main home page
router.get('/',ctrlMain.main);
// learning hub routes for its pages
router.get('/learninghub',ctrllearninghub.home);
router.get('/learninghub/list',ctrllearninghub.list);
router.get('/learninghub/comment',ctrllearninghub.comment);
router.get('/learninghub/new',ctrllearninghub.new);

// report roots
router.get('/reporttool',ctrlreporttool.home);
// router etc
// router etc

module.exports = router;
