var express = require('express');
var router = express.Router();
var ctrlMain = require ('../controllers/main');
var ctrllearninghub = require('../controllers/learninghub');
var ctrlreporttool = require('../controllers/reporttool');
var ctrlAbout = require('../controllers/about');

// route for the main home page
router.get('/',ctrlMain.main);
// learning hub routes for its pages
router.get('/learninghub',ctrllearninghub.home);
router.get('/learninghub/list',ctrllearninghub.list);
router.get('/learninghub/comment',ctrllearninghub.comment);
router.get('/learninghub/new',ctrllearninghub.new);

// report routes
router.get('/reporttool',ctrlreporttool.home);
// reportinfo routes
router.get('/reporttool/info', ctrlreporttool.info);
// router etc

// router for about
router.get('/about',ctrlAbout.about);
router.get('/privacy',ctrlAbout.privacy);
router.get('/team',ctrlAbout.team);

module.exports = router;
