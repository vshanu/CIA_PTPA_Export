var mongoose= require('mongoose');

var weekSchema = new mongoose.Schema
({
   weekId: String,
   weekName: String
},
{
    collection: 'Week'
}); 

module.exports = mongoose.model('WeekDetails', weekSchema, 'Week');

