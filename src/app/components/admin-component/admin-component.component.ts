import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PlayerInfoService } from '../../Services/RetrievePlayerInfo/player-info.service';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})
export class AdminComponentComponent implements OnInit {

  constructor(private _cookieService: CookieService, private _playerInfoService: PlayerInfoService) { }

  showHideDetails: boolean = false;
  playerDetail_Mentors: any = [];
  playerDetail_Mentors_Week: any = [];
  playerDetail_Mentors_Mentors: any = [];
  dataMentors: any;
  mentorDetails: any = {};
  selectedMentors: any;
  filterBy: string;

  selectedLevel: any;
  data: any;

  selectedWeek: any;
  dataWeek: any;

  selected3() {
    this.mentorDetails.mentor = this.selectedMentors.playerMentor;
    /* this._playerInfoService.getplayerMentorDetails_mentor(this.mentorDetails).subscribe((data) => {
      this.playerDetail_Mentors_Mentors = data;      
    });  */  
  }

  selected2() {

    this.mentorDetails.weekId = this.selectedWeek.weekId;
    /* this._playerInfoService.getplayerMentorDetails_week(this.mentorDetails).subscribe((data) => {
      this.playerDetail_Mentors_Week = data;      
    });  */  
  } 
   

  selected1() {
    this.mentorDetails.month = this.selectedLevel.monthName;
    this.mentorDetails.monthId = this.selectedLevel.monthId;
    /* this._playerInfoService.getplayerMentorDetails_month(this.mentorDetails).subscribe((data) => {
      this.playerDetail_Mentors = data;      
    });  */  
  }

  playerInfo(){
    /* this._playerInfoService.getplayerMentorDetails_mentor(this.mentorDetails).subscribe((data) => {
      this.playerDetail_Mentors_Mentors = data;      
    });   */ 
    this._playerInfoService.getplayerMentorDetails_week(this.mentorDetails).subscribe((data2) => {
      this.playerDetail_Mentors_Week = data2;      
    });  
    this._playerInfoService.getplayerMentorDetails_month(this.mentorDetails).subscribe((data3) => {
      this.playerDetail_Mentors = data3;      
    });   

  }


  ngOnInit() {

    this._playerInfoService.getMentorDetails().subscribe((data) => {
      console.log(data);
      this.dataMentors = data;
      
    });   
    this._playerInfoService.getMonths().subscribe((data1) => {
       this.data = data1;
    });
    this._playerInfoService.getWeeks().subscribe((data2) => {
      this.dataWeek = data2;
   });
  }

  showDetails(i) {
    this.showHideDetails = !this.showHideDetails;
  }

}

