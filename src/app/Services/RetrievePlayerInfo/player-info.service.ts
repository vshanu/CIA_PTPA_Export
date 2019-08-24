import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../Services/LoginAuth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getplayerInfo(mentor: any) {

    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/playerinfo', { data: mentor }, {

      headers: new HttpHeaders().set('authtoken', token)

    });
  };


  admingetplayerInfo() {

    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/adminplayerinfo', {

      headers: new HttpHeaders().set('authtoken', token)

    });
  };

  getplayerInfoMonth_FirstWeek(monthdetails: any) {
    var token = this._authService.checkUserStatus();
    console.log(token);
    console.log('Month Details: ', monthdetails);
    return this._http.post('http://localhost:3000/playerinfofirstweek', { data: monthdetails }, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };
  getplayerInfoMonth_SecondWeek(monthdetails: any) {
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/playerinfosecondweek', { data: monthdetails }, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };
  getplayerInfoMonth_ThirdWeek(monthdetails: any) {
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/playerinfothirdweek', { data: monthdetails }, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };
  getplayerInfoMonth_FourthWeek(monthdetails: any) {
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/playerinfofourthweek', { data: monthdetails }, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };
  getplayerInfoTraining(dropDownDetails: any) {
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/getplayerinfotraining', { data: dropDownDetails }, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };
  sendPlayerUpdates(playerUpdateDetails: any) {
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/setplayerinfotraining', { data: playerUpdateDetails }, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };
  getMentorDetails() {
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/getmentordetails', {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };

  getPlayerDetails(mentorDetails: any) {
    console.log("The class is being called!")
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/getplayerinfodetails', { data: mentorDetails }, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };

  deletePlayerDetails() {
    console.log("The class is being called!")
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/deletePlayer', {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };

  
  getplayerMentorDetails_month(mentorDetails: any) {
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/getplayerMentorDetailsmonth',  { data: mentorDetails },{
      headers: new HttpHeaders().set('authtoken', token)
    });
  };

  getplayerMentorDetails_week(mentorDetails: any) {
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/getplayerMentorDetailsweek',  { data: mentorDetails },{
      headers: new HttpHeaders().set('authtoken', token)
    });
  };
  getplayerMentorDetails_mentor(mentorDetails: any) {
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/getplayerMentorDetailsmentor',  { data: mentorDetails },{
      headers: new HttpHeaders().set('authtoken', token)
    });
  };

  getMonths() {
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/getMonths', {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };

  getWeeks() {
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/getWeeks', {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };

  addPlayerManage(playerDetails: any) {
    console.log("pLAYER dETAILS:", playerDetails);
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/addPlayerManage', { data: playerDetails }, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };

  addallmonthPlayerManage(playerDetails: any) {
    console.log("pLAYER dETAILS:", playerDetails);
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/addAllMonthPlayerManage', { data: playerDetails }, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };

  deletePlayerManage(playerDetails: any) {
    console.log("Details:", playerDetails);
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/deletePlayerManage', { data: playerDetails }, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };

  deleteMentorManage(mentorDetails: any) {
    console.log("Details:", mentorDetails);
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/deleteMentorManage', { data: mentorDetails }, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };


  getanalysisplayerDetails(playerDetails: any) {
    console.log("Details:", playerDetails);
    var token = this._authService.checkUserStatus();
    return this._http.get<[]>(`http://localhost:3000/getPlayerDataAnalysis/${playerDetails.playerId}/${playerDetails.monthId}`, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };

  addMentor(mentorDetails: any) {
    console.log("mentorDetails:", mentorDetails);
    var token = this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/addMentorManage', { data: mentorDetails }, {
      headers: new HttpHeaders().set('authtoken', token)
    });
  };

 
}
