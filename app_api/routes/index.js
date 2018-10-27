var express = require('express');
var router = express.Router();
//var ctrlMain = require ('../controllers/main');
var ctrllearninghub = require('../controllers/learninghubapi');
//var ctrlreporttool = require('../controllers/reporttool');
//var ctrlabout = require('../controllers/about');

// Learning hub List AP
// Main page for listing learninghub stuff
router.get('/learninghub/list',ctrllearninghub.learninghubByCreatedDate);


router.get('/learninghub/list',ctrllearninghub.learninghubReadAll);

router.post('/learninghub',ctrllearninghub.learninghubCreate);

router.get('/learninghub/new:learninghubid',ctrllearninghub.learninghubReadOne);

router.put('/learninghub/new:learninghubid',ctrllearninghub.learninghubUpdateOne);

router.delete('/learninghub/new:learninhubid',ctrllearninghub.learninghubDeleteOne);

module.exports = router;

// Learning hub new API
// Main page for creating new learninghub entry
