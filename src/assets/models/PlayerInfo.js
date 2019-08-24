var mongoose= require('mongoose');

var playerInfoSchema = new mongoose.Schema
({

    playerId: Number,
    playerNombres: String,
    playerConducto: String,
    playerAsistencia: String,
    playerRendimientoFisico: String,
    playerAdecuado: String,
    playerRendimientoAcademico: String,
    playerHorasAMentorear: String,
    playerAsititoLaLiga: String,
    playerMentor: String,
    playerMonth: String,
    playerWeek: String
},
{
    collection: 'PlayerData'
}); 

module.exports = mongoose.model('PlayerData', playerInfoSchema, 'PlayerData');

