var mongoose= require('mongoose');

var userSchema = new mongoose.Schema
({
   UserName: {type: String},
   Password: {type: String}
}); 

module.exports = mongoose.model('Login', userSchema);

