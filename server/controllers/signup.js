const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

module.exports= signup = async(req,res) => {
    const{firstname,lastname,username,password}=req.body;
    try {
        const existingUser = await User.findOne({username});
        
        if(existingUser) return res.status(400).json({message : "User already exists ."});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({ firstname,lastname,username,password:hashedPassword});
        
        const token = jwt.sign({username : result.username , id : result._id},'test' , {expiresIn : "1h"});

        res.status(200).json({result,token});

    } catch (error) {
        res.status(500).json({message : 'Something went wrong. '});
    }
}