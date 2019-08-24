var mongoose= require('mongoose');

var mentorInfoSchema = new mongoose.Schema
({
   FirstName: String,
   LastName: String,
   playerMentor: String
},
{
    collection: 'Mentors'
}); 

module.exports = mongoose.model('Mentors', mentorInfoSchema, 'Mentors');

