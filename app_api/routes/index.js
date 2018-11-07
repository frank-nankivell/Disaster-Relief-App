var express = require('express');
var router = express.Router();
//var ctrlMain = require ('../controllers/main');
var ctrllearninghub = require('../controllers/learninghubapi');
//var ctrlreporttool = require('../controllers/reporttool');
//var ctrlabout = require('../controllers/about');

// Main page for listing learninghub stuff

// Search all articles by Created Date
router.get('/learninghub/list/date', ctrllearninghub.learninghubByCreatedDate);

// Search all articles ordered by Disaster type
router.get('/learninghub/list',ctrllearninghub.learninghubByDisasterAll);

// Shows all values from specific Disaster tpe
//router.get('/learninghub/list:searchid',ctrllearninghub.learninghubByDisasterType);
//router.get('learninghub/list:continent', ctrllearninghub.learninghubByContinent);

// Search all articles by Article Type
router.get('/learninghub/list',ctrllearninghub.learninghubByType);

// Search for articles by value
router.get('/learninghub/list:searchid',ctrllearninghub.learninghubSearchVar);

// Page to create record
router.post('/learninghub/new',ctrllearninghub.learninghubCreate);

router.get('/learninghub/get/:learninghubid',ctrllearninghub.learninghubReadOne);

router.put('/learninghub/get/:learninghubid',ctrllearninghub.learninghubUpdateOne);

router.delete('/learninghub/del:learninhubid',ctrllearninghub.learninghubDeleteOne);

module.exports = router;

// Learning hub new API
// Main page for creating new learninghub entry
