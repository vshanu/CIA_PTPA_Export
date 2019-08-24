var mongoose= require('mongoose');

var playerSchema = new mongoose.Schema
({

    playerId: String,
    playerName: String,
    playerMentorId: String
},
{
    collection: 'PlayerInfo'
}); 

module.exports = mongoose.model('PlayerInfo', playerSchema, 'PlayerInfo');

