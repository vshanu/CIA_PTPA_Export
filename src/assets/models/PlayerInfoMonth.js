var mongoose= require('mongoose');

var playerInfoMonthSchema = new mongoose.Schema
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
    playerYear: String,
    playerWeek: String

},
{
    collection: 'PlayerData'
}); 

module.exports = mongoose.model( 'PlayerMonthData', playerInfoMonthSchema, 'PlayerData');

