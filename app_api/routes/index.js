var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.FRANKS_JWT_Key,
  userProperty: 'payload'
});
//var ctrlMain = require ('../controllers/main');
var ctrllearninghub = require('../controllers/learninghubapi');
var ctrlAuth = require('../controllers/authentication');
//var ctrlreporttool = require('../controllers/reporttool');

// Request to get single record
router.get('/learninghub:learninghubid', ctrllearninghub.learninghubGet);

// Request to get List of records by Date
router.get('/learninghub/list/date', ctrllearninghub.learninghubByCreatedDate);

// Request to create record
router.post('/learninghub/new',ctrllearninghub.learninghubCreate);

router.post('/learninghub/new/:learninghubid/comment',auth,ctrllearninghub.learninghubComment);

// Request to update records
router.put('/learninghub/get/:learninghubid',auth,ctrllearninghub.learninghubUpdateOne);

// Request to delete record
router.delete('/learninghub/del:learninhubid',ctrllearninghub.learninghubDeleteOne);

router.post('/register',ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
