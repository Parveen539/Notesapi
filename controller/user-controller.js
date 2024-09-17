const usermodel = require('../model/user-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await usermodel.findOne({email : email})
        if (!existingUser) {
            return res.status(404).json({message : "User not found"});
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({message : "Invalid Credentials"});
        }
        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, SECRET_KEY);
        return res.status(200).json({user : existingUser, token : token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Something went wrong!"});        
    }
}

const signup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const existingUser = await usermodel.findOne({email : email});
        if (existingUser) {
            return res.status(400).json({message : "User already exists!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await usermodel.create({
            username : username,
            password : hashedPassword,
            email : email
        });
        const token = jwt.sign({email : result.email, id : result._id}, SECRET_KEY)
        return res.status(201).json({user : result, token : token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Something went wrong!"});
    }
}

module.exports = {signin, signup};