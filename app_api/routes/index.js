var express = require('express');
var router = express.Router();
//var ctrlMain = require ('../controllers/main');
var ctrllearninghub = require('../controllers/learninghubapi');
//var ctrlreporttool = require('../controllers/reporttool');

// Search all articles by Created Date
router.get('/learninghub/list/date', ctrllearninghub.learninghubByCreatedDate);
// Page to create record
router.post('/learninghub/new',ctrllearninghub.learninghubCreate);

router.get('/learninghub/get/:learninghubid',ctrllearninghub.learninghubReadOne);

router.put('/learninghub/get/:learninghubid',ctrllearninghub.learninghubUpdateOne);

router.delete('/learninghub/del:learninhubid',ctrllearninghub.learninghubDeleteOne);

module.exports = router;
