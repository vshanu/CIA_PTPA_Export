import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  @Input() rating_playerAsititoLaLiga : number;
  @Output() ratingToParent : EventEmitter<string> = new EventEmitter();
  rating_arr_playerAsititoLaLiga : any = [];
  constructor() {}

  ngOnInit() {
    this.rating_arr_playerAsititoLaLiga = Array(Math.round(this.rating_playerAsititoLaLiga)).fill(Math.round(this.rating_playerAsititoLaLiga));
  }
}
