import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from  '../user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../user.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  imageUpload: FileList
  genders = ['male', 'female', 'other'];
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.signupForm = new FormGroup({      
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      gender: new FormControl('male'),
      address: new FormControl(null, [Validators.required]),
      profileImage:  new FormControl(null)
    });
  }

  onUploadImage(event){
    this.imageUpload = event.target.files;
  }
  
  // User Registration
  onUserRegistration(signupForm:any){
    console.log('form submitted');
    // return if form is invalid
    if (signupForm.invalid) {
      console.log('form is invalid');  
      return;
    }

    const email = signupForm.get('email').value;
    const firstName = signupForm.get('firstName').value;
    const lastName = signupForm.get('lastName').value;
    const password = signupForm.get('password').value;
    const gender = signupForm.get('gender').value;
    const address = signupForm.get('address').value;    
    const profileImage = this.imageUpload
  
    this.userService.createUser(email,firstName,lastName,password,gender,address, profileImage, [])
    signupForm.reset();
  }

}
