const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

module.exports= signin = async(req,res) => {
    const { username ,password } = req.body;

    try {
        const existingUser = await User.findOne({username});

        if(!existingUser) return res.status(404).json({message : "User doesn't exist ."});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({message : "Invalid password ."});
        console.log("from sign in",username,password);

        const token = jwt.sign({username : existingUser.username , id : existingUser._id},'test' , {expiresIn : "1h"});

        res.status(200).json({result : existingUser,token});
    } catch (error) {
        res.status(500).json({message : 'Something went wrong. '});
    }
}
