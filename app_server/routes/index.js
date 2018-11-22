var express = require('express');
var router = express.Router();
var ctrlMain = require ('../controllers/main');
var ctrllearninghub = require('../controllers/learninghub');
var ctrlreporttool = require('../controllers/reporttool');
var ctrlabout = require('../controllers/about');

// route for the main home page
router.get('/',ctrlMain.main);
// learning hub routes for its pages
router.get('/learninghub',ctrllearninghub.home);
router.get('/learninghub/list',ctrllearninghub.list);
router.get('/learninghub/comment',ctrllearninghub.comment);
router.get('/learninghub/new',ctrllearninghub.new);
router.post('/learninghub/new',ctrllearninghub.newAdd);
router.get('/learninghub/:learninghubid:/thanks',ctrllearninghub.thanks);

// report routes
router.get('/reporttool',ctrlreporttool.home);
// reportinfo routes
router.get('/reporttool/info',ctrlreporttool.info);
// router etc

// router for about
router.get('/about',ctrlabout.about);
router.get('/privacy',ctrlabout.privacy);
router.get('/team',ctrlabout.team);

module.exports = router;
