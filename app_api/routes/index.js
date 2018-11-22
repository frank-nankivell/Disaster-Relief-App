var express = require('express');
var router = express.Router();
//var ctrlMain = require ('../controllers/main');
var ctrllearninghub = require('../controllers/learninghubapi');
//var ctrlreporttool = require('../controllers/reporttool');

// Request to get single record
router.get('/learninghub/:learninghubid', ctrllearninghub.learninghubGet);

// Request to get List of records by Date
router.get('/learninghub/list/date', ctrllearninghub.learninghubByCreatedDate);

// Request to create record
router.post('/learninghub/new',ctrllearninghub.learninghubCreate);
// Request to update records
router.put('/learninghub/get/:learninghubid',ctrllearninghub.learninghubUpdateOne);

// Request to delete record
router.delete('/learninghub/del:learninhubid',ctrllearninghub.learninghubDeleteOne);

module.exports = router;
