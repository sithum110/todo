const mongoose =require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
   email:String,
   age:Number,
   address:String,
   password:String});
const User = mongoose.model('User', userSchema);
module.exports = User;

//my name is sithu




