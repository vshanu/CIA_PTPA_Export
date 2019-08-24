import { Component, OnInit } from '@angular/core';
import { PlayerInfoService } from '../../Services/RetrievePlayerInfo/player-info.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-player-component',
  templateUrl: './player-component.component.html',
  styleUrls: ['./player-component.component.css'],
  providers: [PlayerInfoService]
})
export class PlayerComponentComponent implements OnInit {

  showHideDetails: boolean = false;
  constructor(private _playerInfoService: PlayerInfoService, private _cookieService: CookieService) { }

  playerDetails_week1: any = [];
  playerDetails_week2: any = [];
  playerDetails_week3: any = [];
  playerDetails_week4: any = [];

  filterBy: string;
  selectedMonth: string = '';
  monthdetails: any = {};
  mentor: any = {};

  selectedLevel: any;
  data: Array<Object> = [
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

  selected() {

    this.monthdetails.month = this.selectedLevel.id;
    this.monthdetails.mID = this._cookieService.get('MentorID');
    console.log(this.monthdetails.month);
    console.log(this.monthdetails.mID);

    this._playerInfoService.getplayerInfoMonth_FirstWeek(this.monthdetails).subscribe((data1) => {
      this.playerDetails_week1 = data1;
      //console.log(data1);
    });

    this._playerInfoService.getplayerInfoMonth_SecondWeek(this.monthdetails).subscribe((data2) => {
      this.playerDetails_week2 = data2;
    });

    this._playerInfoService.getplayerInfoMonth_ThirdWeek(this.monthdetails).subscribe((data3) => {
      this.playerDetails_week3 = data3;
    });

    this._playerInfoService.getplayerInfoMonth_FourthWeek(this.monthdetails).subscribe((data4) => {
      this.playerDetails_week4 = data4;
    });

  }

  ngOnInit() {
 /* this.mentor.mID = this._cookieService.get('MentorID');
    this._playerInfoService.getplayerInfo(this.mentor).subscribe((data) => {
      this.playerDetails_week1 = data;
      this.playerDetails_week2 = data;
      this.playerDetails_week3 = data;
      this.playerDetails_week4 = data;
    });
 */
  }

  selectChangeHandler(event: any) {
    this.selectedMonth = event.target.value;
    console.log(this.selectedMonth);
    alert(this.selectedMonth);
  }

  showDetails(i) {
    this.showHideDetails = !this.showHideDetails;
  }

  ratingFnParent(data: string) {
    console.log(data);
  }
}
