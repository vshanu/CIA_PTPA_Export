var express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken');
var _ = require('underscore');
mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/CIA_PTPA_DB';

var mongoose = require('mongoose',
    {
        useMongoClient: true
    });
mongoose.set('useFindAndModify', false);
mongoose.connect(url);

var Login = require('../src/assets/models/Login');
var PlayerData = require('../src/assets/models/PlayerInfo');
var PlayerMonthData = require('../src/assets/models/PlayerInfoMonth');
var PlayerMonthAverageData = require('../src/assets/models/PlayerInfoMonthlyAverage');
var MentorDetails = require('../src/assets/models/Mentor');
var MonthDetails = require('../src/assets/models/Month');
var WeekDetails = require('../src/assets/models/Week');
var PlayerInfo = require('../src/assets/models/Player');
var MentorInfo = require('../src/assets/models/MentorInfo');

var db = mongoose.connection.on('open', function () {
    console.log("Connected to Mongoose...");
});

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/authenticate', function (req, res) {
    if (req.body.username && req.body.password) {
        Login.findOne({ UserName: req.body.username, Password: req.body.password }).select("playerMentor -_id").lean().exec(function (err, user) {
            var mentor = user
            console.log(JSON.parse(JSON.stringify(mentor)));
            if (err) {

                console.log(err);
            }
            else if (user == null) {
                res.send({
                    isLoggedIn: false
                });
                console.log("User not found!!");
            }
            else if (user == '') {
                res.send({
                    isLoggedIn: false
                });
                console.log("User empty!!");
            }
            else {
                var token = jwt.sign({ 'uname': user.playerMentor }, 'championsinaction-secret-key', {
                    expiresIn: '1h'
                })
                res.send({
                    isLoggedIn: true,
                    mentorId: user.playerMentor,
                    token: token
                });
                calculateAverage(user.playerMentor);
            }
        })
    }

});

function calculateAverage(mentorId){

    var monthArray = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    var weekArray = ["1","2","3","4"];
    
     PlayerMonthData.find({playerMentor: mentorId}, function(error, PlayerMonthData) {
        // console.log('Player Month Data: ', playerData);
        var playersId = _.uniq(PlayerMonthData, 'playerId');
        var uniquePlayersId = playersId.map(function(item){
            return item.playerId;
        }); 

        uniquePlayersId.forEach(function(id) {
            for (var i = 0; i < monthArray.length; i++) {
                    var playersMonthData = _.where(PlayerMonthData, {playerId: id, playerMonth: monthArray[i]});
                    //console.log("MonthDay:",playersMonthData);
                    // console.log('Player Id:', id);
                    // console.log('Month Data: ', playersMonthData);
                    // for (var j = 0; j < monthArray.length; j++) {
                    //     console.log(monthArray[j]);
                    // }
                    if (playersMonthData.length >= 1) {
                        var weekCount = playersMonthData.length;
                        var playerMentor = playersMonthData[0].playerMentor;
                        var playerNombres = playersMonthData[0].playerNombres;
                        var playerConducto = 0;
                        var playerAdecuado = 0;
                        var playerRendimientoFisico = 0;
                        var playerAsistencia = 0;
                        var playerRendimientoAcademico = 0;
                        var playerHorasAMentorear = 0;
                        var playerAsititoLaLiga = 0;
                        playersMonthData.forEach((weekData) => {
                            playerConducto += Number(weekData.playerConducto);
                            playerAdecuado += Number(weekData.playerAdecuado);
                            playerRendimientoFisico += Number(weekData.playerRendimientoFisico);
                            playerAsistencia += Number(weekData.playerAsistencia);
                            playerRendimientoAcademico += Number(weekData.playerRendimientoAcademico);
                            playerHorasAMentorear += Number(weekData.playerHorasAMentorear);
                            playerAsititoLaLiga += Number(weekData.playerAsititoLaLiga);
                        });
                       // console.log("playerAsititoLaLiga:",playerAsititoLaLiga/weekCount);
                        var monthlyAverages = {                          
                            playerId: id,
                            playerNombres: playerNombres,
                            playerConducto: (playerConducto/weekCount).toFixed(1),
                            playerAsistencia: (playerAsistencia/weekCount).toFixed(1),
                            playerRendimientoFisico: (playerRendimientoFisico/weekCount).toFixed(1),
                            playerAdecuado: (playerAdecuado/weekCount).toFixed(1),
                            playerRendimientoAcademico: (playerRendimientoAcademico/weekCount).toFixed(1),
                            playerHorasAMentorear: (playerHorasAMentorear/weekCount).toFixed(1),
                            playerAsititoLaLiga: (playerAsititoLaLiga/weekCount).toFixed(1),
                            playerMentor: playerMentor,
                            playerMonth: monthArray[i],
                            playerYear: "2019"   
                        };       
                       console.log("Monthly Averages",monthlyAverages); 
                        // monthlyAverages.save(function(error, data) {
                        //     console.log(error);
                        // });
                        PlayerMonthAverageData.findOneAndUpdate(
                            { playerId: id, 
                            playerMonth: monthArray[i]},
                             // find a document with that filter
                            monthlyAverages, // document to insert when nothing was found
                            {upsert: true, new: true}, // options upsert: false,
                            function (err, doc) { // callback
                                if (err) {
                                    console.log("Not updated!")
                                    // handle error
                                } else {
                                    console.log("Update Successful!")
                                    // handle document
                                }
                            }
                        );
                    }
            }
        });  
    });    
}


app.use(function (req, res, next) {
    var token = req.body.authtoken || req.query.authtoken || req.headers['authtoken']
    jwt.verify(token, 'championsinaction-secret-key', function (err, decoded) {
        if (err) {
            res.send({
                err: true,
                msg: 'Invalid Request'
            });

        } else {
            console.log(decoded);
            req.decoded = decoded;
            next();
        }
    });
});
app.get('/', function (req, res) {
    // dbo.collection("Mentors").find({}).toArray(function(err,result){
    //   if (err) throw err;
    // res.send(result);
    res.send("Valid Request!!")
});


app.post('/playerinfo', function (req, res) {
    PlayerData.find({ playerMentor: req.body.data.mID }).lean().exec(function (err, user) {
        if (err) {
            console.log(err);
        }
        else if (user == null) {
            console.log("User not found!!");
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        }
    });
})

app.post('/adminplayerinfo', function (req, res) {
    PlayerInfo.find().lean().exec(function (err, user) {
        if (err) {
            console.log(err);
        }
        else if (user == null) {
            console.log("User not found!!");
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        }
    });
})


app.post('/playerinfofirstweek', function (req, res) {
   // console.log('Request body:', req.body.data.month);
    PlayerMonthData.find({ playerMonth: req.body.data.month, playerMentor: req.body.data.mID, playerWeek: "1" }).lean().exec(function (err, user) {
      //  console.log("User:" + user);
        if (err) {
            console.log(err);
        }
        else if (user == null) {
            console.log("User not found!!");
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
           
        }
    });
})

app.post('/playerinfosecondweek', function (req, res) {
   // console.log('Request body:', req.body.data.month);
    PlayerMonthData.find({ playerMonth: req.body.data.month, playerMentor: req.body.data.mID, playerWeek: "2" }).lean().exec(function (err, user) {
     //   console.log("User:" + user);
        if (err) {
            console.log(err);
        }
        else if (user == null) {
            console.log("User not found!!");
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
           
        }
    });
})


app.post('/playerinfothirdweek', function (req, res) {
    //console.log('Request body:', req.body.data.month);
    PlayerMonthData.find({ playerMonth: req.body.data.month, playerMentor: req.body.data.mID, playerWeek: "3" }).lean().exec(function (err, user) {
       // console.log("User:" + user);
        if (err) {
            console.log(err);
        }
        else if (user == null) {
            console.log("User not found!!");
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        }
    });
})


app.post('/playerinfofourthweek', function (req, res) {
   //console.log('Request body:', req.body.data.month);
    PlayerMonthData.find({ playerMonth: req.body.data.month, playerMentor: req.body.data.mID, playerWeek: "4" }).lean().exec(function (err, user) {
        console.log("User:" + user);
        if (err) {
            console.log(err);
        }
        else if (user == null) {
            console.log("User not found!!");
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        }
    });
})

app.post('/getplayerinfotraining', function (req, res) {
    PlayerMonthData.find({ playerMonth: req.body.data.month, playerMentor: req.body.data.mID, playerWeek: req.body.data.week }).select("playerId playerNombres -_id").lean().exec(function (err, user) {
        console.log("User:" + user);
        if (err) {
            console.log(err);
        }
        else if (user == null) {
            console.log("User not found!!");
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        }
    });
})

app.post('/setplayerinfotraining', function (req, res) {
    console.log("API Called!")
    PlayerMonthData.updateOne({ playerMonth: req.body.data.month, playerMentor: req.body.data.mID, playerWeek: req.body.data.week, playerNombres: req.body.data.name }, { playerConducto: req.body.data.conductRating, playerAsistencia: req.body.data.asistRating, playerRendimientoFisico: req.body.data.fisicoRating, playerAdecuado: req.body.data.vestRating, playerRendimientoAcademico: req.body.data.acadRating, playerHorasAMentorear: req.body.data.horasRating, playerAsititoLaLiga: req.body.data.astitoRating }).exec(function (err, user) {
        //console.log("User:" + user);
        if (err) {
            console.log(err);
            console.log("False Called!")
            res.send({
                isSuccessful: false,
                user               
            });
        }
        else if (!err) {
            console.log("True Called");
            res.send({status: 200, isSuccessful: true, mesg: 'Data updated successfuly'})
        }
        else if (user == null) {
            console.log("User not found!!");
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send({status: 200, isSuccessful: true, mesg: 'Data updated successfuly'})
        }
    });
})

/*   res.send([
     {
         "playerId": 1,
         "playerNombres": "ANNA GABRIELA AGUIRRE",
         "playerConducto": "2",
         "playerAsistencia": "1",
         "playerRendimientoFisico": "5",
         "playerAdecuado": "5",
         "playerRendimientoAcademico": "5",
         "playerHorasAMentorear": "5",
         "playerAsititoLaLiga": "4"
     },
     {
        "playerId": 2,
         "playerNombres": "BARBARA YOC",
         "playerConducto": "2",
         "playerAsistencia": "1",
         "playerRendimientoFisico": "5",
         "playerAdecuado": "5",
         "playerRendimientoAcademico": "5",
         "playerHorasAMentorear": "5",
         "playerAsititoLaLiga": "3"
     },
     {
        "playerId": 3,
         "playerNombres": "JENNIFER ALONZO",
         "playerConducto": "2",
         "playerAsistencia": "6",
         "playerRendimientoFisico": "5",
         "playerAdecuado": "2",
         "playerRendimientoAcademico": "5",
         "playerHorasAMentorear": "5",
         "playerAsititoLaLiga": "1"
     },
     {
        "playerId": 4,
         "playerNombres": "ALICIA CHIVALÁN",
         "playerConducto": "2",
         "playerAsistencia": "6",
         "playerRendimientoFisico": "5",
         "playerAdecuado": "5",
         "playerRendimientoAcademico": "5",
         "playerHorasAMentorear": "5",
         "playerAsititoLaLiga": "2"
     },
     {
         "playerId": 5,
         "playerNombres": "ALMA XOT",
         "playerConducto": "6",
         "playerAsistencia": "1",
         "playerRendimientoFisico": "5",
         "playerAdecuado": "3",
         "playerRendimientoAcademico": "5",
         "playerHorasAMentorear": "5",
         "playerAsititoLaLiga": "5"
     }
 ]); 


});

*/

app.post('/getmentordetails', function (req, res) {
    MentorInfo.find().select("playerMentor FirstName -_id").lean().exec(function (err, user) {
        console.log("User:" + user);
        if (err) {
            console.log(err);
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
           
        }
    });
})


app.post('/getplayerMentorDetailsmonth', function (req, res) {
    PlayerMonthAverageData.find({ playerMonth: req.body.data.monthId, playerMentor: req.body.data.mentor}).exec(function (err, user) {
        console.log("Idea:" + req.body.data.monthId);
        console.log("Idea:" + req.body.data.mentorId);
        if (err) {
            console.log(err);
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        }
    });
})

app.post('/getplayerMentorDetailsweek', function (req, res) {
    PlayerData.find({ playerMonth: req.body.data.monthId, playerWeek: req.body.data.weekId}).exec(function (err, user) {
        if (err) {
            console.log(err);
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        }
    });
})

 app.post('/getplayerMentorDetailsmentor', function (req, res) {
    PlayerData.find({ playerMonth: req.body.data.monthId, playerMentor: req.body.data.mentor, playerWeek: req.body.data.weekId}).exec(function (err, user) {
        console.log("User:" + user);
        if (err) {
            console.log(err);
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        }
    });
}) 

app.post('/getMonths', function (req, res) {
    MonthDetails.find().exec(function (err, user) {
        console.log("User:" + user);
        if (err) {
            console.log(err);
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        }
    });
})

app.post('/getplayerinfodetails', function (req, res) {
    PlayerInfo.find({  playerMentorId: req.body.data }).exec(function (err, user) {
        console.log("Player Information1:" + req.body.data);
        console.log("Player Information2:" + user);
        if (err) {
            console.log(err);
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        }
    });
})


app.post('/deletePlayer', function (req, res) {
    PlayerInfo.find().exec(function (err, user) {
        if (err) {
            console.log(err);
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        }
    });
})



app.post('/getWeeks', function (req, res) {
    WeekDetails.find().exec(function (err, user) {
        console.log("User:" + user);
        if (err) {
            console.log(err);
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        }
    });
})

app.post('/deletePlayerManage', function (req, res) {
    console.log(req.body.data.Id);
     PlayerInfo.remove({playerId : req.body.data.Id}).exec(function (err, user) {
        if (err) {
            console.log(err);
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        } 
    });
})

app.post('/deleteMentorManage', function (req, res) {
    console.log(req.body.data.Id);
    MentorInfo.remove({playerMentor : req.body.data.Id}).exec(function (err, user) {
        if (err) {
            console.log(err);
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.send(user);
            
        } 
    });
})

app.post('/addMentorManage', function (req, res) {
    console.log('Fname',req.body.data.Fname);
    console.log('Lname',req.body.data.Lname);
    console.log('Id',req.body.data.Id);

    MentorInfo.findOne({FirstName: req.body.data.Fname, LastName: req.body.data.Lname, playerMentor: req.body.data.Id}).exec(function (err, obj) {
       console.log(obj);
       console.log(err);
        if (obj = "null" ) {     
            var user = new MentorInfo();
            user.FirstName = req.body.data.Fname;
            user.LastName = req.body.data.Lname;
            user.playerMentor = req.body.data.Id;
            user.save().then(function(err, result) {
                if(err){
                    console.log('err',err);
                    res.send(err);
                } else
                {
                    console.log('Mentor Created');
                }
            
        })   
            
        }
        else {
            console.log(err);
            res.send(err);
    }; 
});
})


app.get('/getPlayerDataAnalysis/:playerId/:monthId', function (req, res) {
    console.log('Params Data:', req.params);
    PlayerMonthAverageData.find({ playerId: req.params.playerId, playerMonth: req.params.monthId }).select('playerConducto playerAsistencia playerRendimientoFisico playerAdecuado playerRendimientoAcademico playerHorasAMentorear playerAsititoLaLiga -_id').exec(function (err, user) {
        if (err) {
            console.log(err);
        }
        else if (user == '') {
            console.log("User empty!!");
        }
        else {
            res.json({'userData': user});
            
        } 
    });
})


app.post('/addPlayerManage', function (req, res) {
    PlayerInfo.findOne({playerId: req.body.data.Id}).exec(function (err, obj) {
        if (obj) {       
            console.log(err);
            res.send(err);
        }
        else {
            var user = new PlayerInfo();
            user.playerId = req.body.data.Id;
            user.playerName = req.body.data.Name;
            user.playerMentorId = req.body.data.Mentor;
            this.addPlayerData(req.body.data.Id, req.body.data.Name, req.body.data.Mentor);
            user.save().then(function(err, result) {
                if(err) {
                    res.send(err);
                } else {
                    console.log('User Created');
                }
        }) 
    }; 
});
})

function addPlayerData(playerId, playerName, playerMentorId) {
    // PlayerData
 
    let playersData = [];
    for (let month=1; month<=12; month++) {
        for (let week=1; week<=4; week++) {

            playersData.push({ playerId: playerId,
                playerNombres: playerName,
                playerConducto: '1',
                playerAsistencia: '1',
                playerRendimientoFisico: '1',
                playerAdecuado: '1',
                playerRendimientoAcademico: '1',
                playerHorasAMentorear: '1',
                playerAsititoLaLiga: '1',
                playerMentor: playerMentorId,
                playerMonth: month,
                playerWeek: week,
                playerYear: '2019'
            });
        }
    }
    console.log('Player Add Details:', playersData);

}

/*  app.post('/addAllMonthPlayerManage', function (req, res) {
    var monthArray = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    PlayerMonthData.findOne({playerId: req.body.data.Id}).exec(function (err, obj) {
        if (obj) {       
            console.log(err);
            res.send(err);
        }
        else {
            var user = new PlayerInfo();
            for(var i = 0; i < monthArray.length; i++)
            {
                user.playerId = req.body.data.Id; 
                user.playerNombres = req.body.data.Name;
                user.playerMentor = req.body.data.Mentor;
                user.playerConducto = '1';
                user.playerAsistencia = '1';
                user.playerRendimientoFisico = '1';
                user.playerAdecuado = '1';
                user.playerRendimientoAcademico = '1';
                user.playerHorasAMentorear = '1';
                user.playerAsititoLaLiga = '1';
                //user.playerMonth = monthArray[i];
                user.save().then(function(err, result) {
                    if(err){
                        res.send(err);
                    } else
                    {
                        console.log('User Created');
                    }
                
            }) 
            }

    }; 
});
})  */




app.listen(3000, function () {

    console.log('Server running @ localhost:3000');

});

mongodb.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    console.log('Connection Established!!!');
    var dbo = db.db("CIA_PTPA_DB");
    var query = { UserName: "admin" };
    dbo.collection("Login").find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
})
