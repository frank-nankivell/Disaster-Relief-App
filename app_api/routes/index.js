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
router.get('/reporttool:reportID', ctrlreportTool.getReport);
// Create new Report 
router.post('/reporttool/new', ctrlreportTool.newReport);

// !! Authentication required for these routes !!
// Get all values by date 
router.get('/reporttool/date',ctrlreportTool.reportCreatedDate);
// Count number of reports issued
router.get('/reporttool/num',ctrlreportTool.reportCount);
// Update existing report
router.put('/reporttool:reportID', ctrlreportTool.reportUpdate);
// Comment on existing report
router.post('/reporttool:reportID/comment', ctrlreportTool.newReportComment);
// Update existing report comment
router.put('/reporttool:reportID/comment:repcommentID', ctrlreportTool.reportCommentUpdate);
// Delete existing report Comment
router.delete('/reporttool/del:reportID',ctrlreportTool.reportCommentDeleteOne);
// Delete existing report
router.delete('/reporttool/:reportID', ctrlreportTool.reportDeleteOne);

// Validation API call to check and send email to any users with this country
router.get('/user/country:countryID',ctrlAuth.checkCountryOnUser);
// // Validation API call to check and send provide alert to logged in user
router.get('/user/user:userID', ctrlAuth.checkCountryOnUser);

// LEARNINGHUB ROUTES BELOW

// !! No Authentication for these routes !!

// Get LH record  by ID
router.get('/learninghub:learninghubid', ctrllearninghub.learninghubGet);
// Get all records for country map
router.get('/learninghub/visAll', ctrllearninghub.countryVisualisation);
// Request to get List of all records ordered by Date
router.get('/learninghub/list/date', ctrllearninghub.learninghubByCreatedDate);


// Create new LH
router.post('/learninghub/new', ctrllearninghub.learninghubCreate);
// Comment on existing LH
router.post('/learninghub/:learninghubid/comment', auth, ctrllearninghub.learninghubComment);
// Update to existing LH
router.put('/learninghub/get/:learninghubid',ctrllearninghub.learninghubUpdateOne);
// Delete existing LH
router.delete('/learninghub/del:learninhubid',ctrllearninghub.learninghubDeleteOne);


// ADMIN LOGIN ROUTES BELOW  
router.post('/register',ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
