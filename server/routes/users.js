const express = require("express");

const signin = require('../controllers/signin.js');
const signup = require('../controllers/signup.js');

//import { signin,signup } from '../controllers/users.js';

const router= express.Router();

router.post('/signin',signin);
router.post('/signup',signup);

module.exports= router;