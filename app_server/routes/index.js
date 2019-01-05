var express = require('express');
var router = express.Router();
var ctrlMain = require ('../controllers/main');
var ctrllearninghub = require('../controllers/learninghub');
var ctrlreporttool = require('../controllers/reporttool');
var ctrlabout = require('../controllers/about');

// route for the main home page
router.get('/',ctrlMain.main);
router.get('/signup', ctrlMain.loginRegister);
router.get('/signup/about', ctrlMain.registerAbout);
router.post('/signup',ctrlMain.registerNew);
// learning hub routes for its pages
router.get('/learninghub',ctrllearninghub.home);
router.get('/learninghub/list',ctrllearninghub.list);
router.get('/learninghub/:learninghubid/comment',ctrllearninghub.comment);
router.post('/learninghub/:learninghubid/comment',ctrllearninghub.commentAdd);
router.post('/learninghub',ctrllearninghub.homeSearch);
router.get('/learninghub/new',ctrllearninghub.new);
router.post('/learninghub/new',ctrllearninghub.newAdd);
router.get('/learninghub/thanks:learninghubid',ctrllearninghub.thanks);


// report routes
router.get('/reporttool',ctrlreporttool.home);
// post to API for new report
router.post('/reporttool',ctrlreporttool.new);
// post to validation of the completed form
router.post('/reporttool/val',ctrlreporttool.val);
// reportinfo routes
router.get('/reporttool/info',ctrlreporttool.info);
// page for list of reports
router.get('/reporttool/list',ctrlreporttool.list);
//
router.post('/reporttool/info',ctrlreporttool.search);



//router.get('/reporttool/new',ctrlreporttool.reporttoolNew);
// router etc

// router for about
router.get('/about',ctrlabout.about);
router.get('/privacy',ctrlabout.privacy);
router.get('/team',ctrlabout.team);

module.exports = router;
