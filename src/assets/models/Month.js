var mongoose= require('mongoose');

var monthSchema = new mongoose.Schema
({
   monthId: String,
   monthName: String
},
{
    collection: 'Month'
}); 

module.exports = mongoose.model('MonthDetails', monthSchema, 'Month');

