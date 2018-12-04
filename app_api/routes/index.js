var express = require('express');
var router = express.Router();
//var ctrlMain = require ('../controllers/main');
var ctrllearninghub = require('../controllers/learninghubapi');
var ctrlAuth = require('../controllers/authentication');
var ctrlreportTool = require('../controllers/reporttoolapi');

// Need to implement accordingly 

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.FRANKS_JWT_Key,
  userProperty: 'payload'
});
// REPORT TOOL ROUTES BELOW

// !! No Authentication for these routes !!

// View single report by ID
router.get('/reportool:reportID',ctrlreportTool.getReport);
// Create new Report 
router.post('/reportool/new', ctrlreportTool.newReport);
// !! Authentication required for these routes !!
// Comment on existing report
router.post('/reportool/new:reportID/comment', ctrlreportTool.newReportComment);
// Update existing report comment
router.put('/reportool/new:reportID/comment', ctrlreportTool.reportCommentUpdate);
// Delete existing report Comment
router.delete('/learninghub/del:learninhubid',ctrlreportTool.reportCommentDeleteOne);
// Update existing report
router.put('/reporttool/new:reportID', ctrlreportTool.reportUpdate);
// Delete existing report
router.delete('/reporttool/:reportID', ctrlreportTool.reportDeleteOne);


// LEARNINGHUB ROUTES BELOW

// !! No Authentication for these routes !!

// Get LH record  by ID
router.get('/learninghub:learninghubid', ctrllearninghub.learninghubGet);
// Get all records for country map
router.get('/learninghub/visAll', ctrllearninghub.countryVisualisation);
// Request to get List of all records ordered by Date
router.get('/learninghub/list/date', ctrllearninghub.learninghubByCreatedDate);

//!! Need Authentication to access these LH Routes!!

// Create new LH
router.post('/learninghub/new', ctrllearninghub.learninghubCreate);
// Comment on existing LH
router.post('/learninghub/new/:learninghubid/comment', ctrllearninghub.learninghubComment);
// Update to existing LH
router.put('/learninghub/get/:learninghubid',ctrllearninghub.learninghubUpdateOne);
// Delete existing LH
router.delete('/learninghub/del:learninhubid',ctrllearninghub.learninghubDeleteOne);


// ADMIN LOGIN ROUTES BELOW  
router.post('/register',ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
