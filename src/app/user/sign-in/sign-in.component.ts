import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../user.component.css']
})
export class SignInComponent implements OnInit {

  signinForm :FormGroup;
  
  constructor(private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onUserLogin(signinForm){
    if (this.signinForm.invalid) {
      return;
    }
    const emailId = signinForm.get('email').value;
    const password = signinForm.get('password').value;

    this.userService.loginUser(emailId,password);
    signinForm.reset();
  }

}
