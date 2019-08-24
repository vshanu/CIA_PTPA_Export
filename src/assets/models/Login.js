var mongoose= require('mongoose');

var loginSchema = new mongoose.Schema
({
   UserName: String,
   Password: String,
   playerMentor: String
},
{
    collection: 'Login'
}); 

module.exports = mongoose.model('Login', loginSchema, 'Login');

