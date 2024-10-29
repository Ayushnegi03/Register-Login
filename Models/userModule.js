const mongoose =require('mongoose');
const data=new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},


});
//const User = mongoose.model('User',data);
module.exports = mongoose.model('Data', data);