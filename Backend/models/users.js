const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
username: { type: String},
email:{type :String },    
password: { type: String},

})

const  usersModel = mongoose.model("users",UsersSchema)
module.exports = usersModel