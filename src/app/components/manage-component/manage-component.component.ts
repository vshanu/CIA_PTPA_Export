import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PlayerInfoService } from '../../Services/RetrievePlayerInfo/player-info.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-component',
  templateUrl: './manage-component.component.html',
  styleUrls: ['./manage-component.component.css']
})
export class ManageComponentComponent implements OnInit {

  constructor(private _cookieService: CookieService, private _playerInfoService: PlayerInfoService) { }

  dataMentors: any;
  selectedMentor: any;
  dataMentor: any;
  selectedMentorFname: any;
  selectedMentorLname: any;
  selectedMentorId: any;
  selectedPlayerId: any;
  selectedPlayerName: any;
  addPlayerDetailsId: any;
  addPlayerDetailsName: any;
  deleteMentorDetails: any;
  addPlayerDetailsMentor: any;
  addMentorDetailsFname: any;
  addMentorDetailsLname: any;
  addMentorDetailsId: any;
  addPlayer: any = {};
  addMentor: any = {};
  dataId: any;
  selectdeletePlayer: any;
  deletePlayerInfo: any;
  deletePlayer: any = {};
  selectedMentors: any;
  deleteMentor: any = {};

  selected1() {
    this.addPlayerDetailsId = this.selectedPlayerId;
    console.log(this.selectedPlayerId);
    console.log("I am called!");
    console.log(this.addPlayerDetailsId);
  
    this.addPlayer.Id = this.addPlayerDetailsId;
    console.log(this.addPlayer);
  }

  selected2() {
    this.addPlayerDetailsName = this.selectedPlayerName;
    console.log(this.selectedPlayerName);
    console.log("I am called!");
    console.log(this.addPlayerDetailsName);
    this.addPlayer.Name = this.addPlayerDetailsName;
    console.log(this.addPlayer); 
  }

  selected3() {
    this.deleteMentorDetails = this.selectedMentors.playerMentor;
    console.log(this.selectedMentors);
    console.log("I am called!");
    console.log(this.deleteMentorDetails);
    this.deleteMentor.Id = this.deleteMentorDetails
    console.log(this.deleteMentor.Id);
   /*  this.addPlayer.Name = this.addPlayerDetailsName;
    console.log(this.addPlayer);  */
  }



  selectedMentorFnameFn(){
    this.addMentorDetailsFname = this.selectedMentorFname;
    this.addMentor.Fname = this.addMentorDetailsFname;
    console.log("addMentorDetailsFname",this.addMentorDetailsFname );
    console.log("addMentor", this.addMentor);              
    
  }

  selectedMentorLnameFn(){
    this.addMentorDetailsLname = this.selectedMentorLname;
    this.addMentor.Lname = this.addMentorDetailsLname;
    console.log("addMentorDetailsLname",this.addMentorDetailsLname );
    console.log("addMentor", this.addMentor);            

  }

  selectedMentorIdFn(){
    this.addMentorDetailsId = this.selectedMentorId;
    this.addMentor.Id = this.addMentorDetailsId;
    console.log("addMentorDetailsId",this.addMentorDetailsId );
    console.log("addMentor", this.addMentor); 


  }
  selectedPlayerMentor(){
    console.log(this.selectedMentor.playerMentor);
    this.addPlayerDetailsMentor = this.selectedMentor.playerMentor;
    console.log("I am called!");
    console.log(this.addPlayerDetailsMentor);
    this.addPlayer.Mentor = this.addPlayerDetailsMentor;
    console.log(this.addPlayer);
  }

  deletePlayerFn(){
    this.deletePlayerInfo = this.selectdeletePlayer.playerId;
    console.log(this.deletePlayerInfo);
    console.log("I am called!");
    this.deletePlayer.Id = this.deletePlayerInfo;
    console.log(this.deletePlayer);

  }

  AddPlayerSubmit(){
    console.log(this.addPlayer);
    this._playerInfoService.addPlayerManage(this.addPlayer).subscribe((data) => {
      console.log(data);     
      if(data = "null")
      {
        alert("Please use different player Id, duplicate Ids not allowed!");
      }
    }); 

    this._playerInfoService.addallmonthPlayerManage(this.addPlayer).subscribe((data) => {
      console.log(data);     
    }); 
    
    
  }


  AddMentorSubmit(){
    this._playerInfoService.addMentor(this.addMentor).subscribe((data) => {
      console.log(data);     
    }); 
       
  }




  DeletePlayerSubmit(){
    this._playerInfoService.deletePlayerManage(this.deletePlayer).subscribe((data) => {
      console.log(data); 
    }); 
  }

  DeleteMentorSubmit(){
    this._playerInfoService.deleteMentorManage(this.deleteMentor).subscribe((data) => {
      console.log(data); 
    }); 
  }

  ngOnInit() {

    this._playerInfoService.getMentorDetails().subscribe((data) => {
      this.dataMentors = data;    
      console.log(this.dataMentors);
    });     
    
    this._playerInfoService.deletePlayerDetails().subscribe((data) => {
      this.dataId = data;    
      console.log(this.dataId);
    });  
  }

}
