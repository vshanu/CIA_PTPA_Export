import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/LoginAuth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  toggleLinks : Boolean = false;
  toggleLinks2 : Boolean = false;

  constructor(private _authservice : AuthService) { }

  ngOnInit() {
    this._authservice.$authObservable.subscribe((data) => {
    this.toggleLinks = data;
    
    });
    this._authservice.$authObservable2.subscribe((data2) =>{
      if(data2 === "AD1"){
        this.toggleLinks2 = data2;
      }
   
    });
  }

  logout(){
    this._authservice.logout();

  }
}
