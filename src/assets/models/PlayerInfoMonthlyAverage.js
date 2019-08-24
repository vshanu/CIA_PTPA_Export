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

},
{
    collection: 'PlayerData_MonthlyAverage'
}); 

module.exports = mongoose.model( 'PlayerMonthAverageData', playerInfoMonthSchema, 'PlayerData_MonthlyAverage');

