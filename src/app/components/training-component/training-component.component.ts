import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { PlayerInfoService } from '../../Services/RetrievePlayerInfo/player-info.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-training-component',
  templateUrl: './training-component.component.html',
  styleUrls: ['./training-component.component.css']
})
export class TrainingComponentComponent implements OnInit {

  title = 'PTPA';
  constructor(private _cookieService: CookieService, private _playerInfoService: PlayerInfoService) { }

  monthdetails: any = {};
  playerDetails: any = {};
  mentor: any = {};

  selectedLevel: any;
  data: Array<Object> = [
    { id: 0, name: "Seleccionar Month" },
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" }
  ];

  selectedWeek: any;
  dataWeek: Array<Object> = [
    { id: 0, name: "Seleccionar Week" },
    { id: 1, name: "Week1" },
    { id: 2, name: "Week2" },
    { id: 3, name: "Week3" },
    { id: 4, name: "Week4" }

  ];

  selectedNombres: any;
  dataNombres: any;

  selectedAsist: any;
  dataAssist: Array<Object> = [
    { id: 0, name: "No atendido" },
    { id: 1, name: "Atendido" }
  ];

  selectedConduct: any;
  dataConduct: Array<Object> = [

    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" }
  ];
  selectedFisico: any;
  dataFisico: Array<Object> = [
 
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
    { id: 6, name: "6" },
    { id: 7, name: "7" }
  ];
  selectedVest: any;
  dataVest: Array<Object> = [
    { id: 0, name: "No atendido" },
    { id: 1, name: "Atendido" }
  ];

  selectedAcad: any;
  dataAcad: Array<Object> = [

    { id: 1, name: "Feliz" },
    { id: 2, name: "Enfadado" },
    { id: 3, name: "Fatigado" }
  ];

  selectedHoras: any;
  dataHoras: Array<Object> = [

    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" }
  ];

  selectedAstito: any;
  dataAstito: Array<Object> = [
    { id: 0, name: "No atendido" },
    { id: 1, name: "Atendido" }
  ];


  selected() {

    this.monthdetails.month = this.selectedLevel.id;
    this.monthdetails.mID = this._cookieService.get('MentorID');
    this.monthdetails.week = this.selectedWeek.id;


    this._playerInfoService.getplayerInfoTraining(this.monthdetails).subscribe((data1) => {
      console.log(data1);
      this.dataNombres = data1;
 
    });

  }

  addPlayer(playerForm: NgForm) {

    this.playerDetails.month = this.selectedLevel.id;
    this.playerDetails.mID = this._cookieService.get('MentorID');
    this.playerDetails.week = this.selectedWeek.id; 
    this.playerDetails.name = this.selectedNombres.playerNombres;
    this.playerDetails.asistRating = this.selectedAsist.id;
    this.playerDetails.conductRating = this.selectedConduct.id;
    this.playerDetails.fisicoRating = this.selectedFisico.id;
    this.playerDetails.vestRating = this.selectedVest.id;
    this.playerDetails.acadRating = this.selectedAcad.id;
    this.playerDetails.horasRating = this.selectedHoras.id;
    this.playerDetails.astitoRating = this.selectedAstito.id;

    this._playerInfoService.sendPlayerUpdates(this.playerDetails).subscribe((data) => {

      if (data['status'] == 200) {
        alert("Información del jugador actualizada con éxito!")
        this.playerDetails = {};
        playerForm.reset();
      }
      else{
        alert("La actualización no se realizó correctamente, ¡actualice nuevamente!")
        this.playerDetails = {};
        playerForm.reset();
      }
    });
  }

  ngOnInit() {
  }



}
