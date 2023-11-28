import User from "../model/User";
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if(!users) {
        return res.ststus(404).json({message: "No Users Found"});
    }
    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, password }  = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if(existingUser) {
        return res.status(400).json({message: "User Already Exists"});
    }
    const hashPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashPassword
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({ user });
};

export const login = async(req, res, next) => {
    const { email, password }  = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if(!existingUser) {
        return res.status(404).json({message: "Could not find the user"});
    }

    const isPasswordcorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordcorrect){
        return res.status(400).json({message:"Password Incorrect"});
    }
    return res.status(200).json({message: "Login Success"});

};