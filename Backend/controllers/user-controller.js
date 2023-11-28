import User from "../model/User";

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
    const user = new User({
        name,
        email,
        password
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({ user });
};