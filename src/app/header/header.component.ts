import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoggedInFlag:boolean = false;
  Subscription: any;

  constructor(private userService: UserService) {
    this.userLoggedInFlag = this.userService.LoggedInUser() ? true : false
    this.Subscription = this.userService.loginFlag.subscribe(loggedIn => {
      this.userLoggedInFlag = loggedIn
      // this.changeLogInStatus(loggedIn)
      console.log(loggedIn)
    });
   }

  ngOnInit(): void {
    
  }

  logout(){
    this.userService.signOutUser();
    
  }
 

}
