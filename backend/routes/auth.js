// Express router to handle /api/auth requests
const express = require("express");
const router = express.Router();
// import User schema from models/User.js
const User = require("../models/User");
// import express-validator to validate user input
const { body, validationResult } = require("express-validator");
//bcryptjs to hash passwords
const bcrypt = require('bcrypt');

//JWT Token to authenticate users
var jwt = require('jsonwebtoken');
// Feteching user from jwt token
var fetchUser = require('../middleware/fetchuser');

JWT_SECRET='your_jwt_secret'

// ROUTE 1: Create a User using: POST "/api/auth". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }
        //hashing the password
        const secPass = await bcrypt.hash(req.body.password, 10);

        //create a new user using User.create()
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            date: new Date()
        })
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        // return the user after saving it to the database using res.json()
        //res.json(user)
        res.json({ authtoken })
    }
    // catch block to handle errors
    catch (error) {
       console.error(error.message);
        res.status(500).send("Inernal Server Error")
    }
})

//ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    try {
        let user =await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        
        const data = {
            user: {
                id: user.id
            }
        }
        
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        // return the user after saving it to the database using res.json()
        //res.json(user)
        res.json({ authtoken })
        
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Inernal Server Error")
    }
}) 
//ROUTE 3: Get logged in User Dtails using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchUser, async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

  try {
    // request.user is getting fetched from Middleware after token authentication
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
}
catch (error) {
    console.error(error.message);
    res.status(500).send("Inernal Server Error")
    }
})



// Exporting router to index.js 
module.exports = router;
