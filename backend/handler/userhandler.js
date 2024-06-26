const User = require('../db/user');

async function addUser(req, res) {
    let user = new User({
        ...userModel});
        await user.save();
    return User.t0Object(user);}
