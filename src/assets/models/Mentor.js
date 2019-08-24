var mongoose= require('mongoose');

var mentorSchema = new mongoose.Schema
({
   playerMentor: String,
   mentorName: String
},
{
    collection: 'Login'
}); 

module.exports = mongoose.model('MentorDetails', mentorSchema, 'Login');

