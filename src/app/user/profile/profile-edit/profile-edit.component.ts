import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['../../user.component.css']
})
export class ProfileEditComponent implements OnInit {
  signupForm: FormGroup;
  currentUser: User;
  imageUpload: FileList;
  route: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.currentUser = this.userService.getUser( sessionStorage.getItem('email'))

    this.signupForm = new FormGroup({
      email: new FormControl(this.currentUser.email, [Validators.required, Validators.email]),
      firstName: new FormControl(this.currentUser.firstName, [Validators.required]),
      lastName: new FormControl(this.currentUser.lastName, [Validators.required]),
      password: new FormControl(this.currentUser.password, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(this.currentUser.password, [Validators.required, Validators.minLength(6)]),
      gender: new FormControl(this.currentUser.gender),
      address: new FormControl(this.currentUser.address, [Validators.required]),
      profileImage: new FormControl(null, [Validators.required])
    })
  }

  onUploadImage(event){
    this.imageUpload = event.target.files;
  }


  onUserProfileUpdate(signupForm: any){
    console.log('form editing mode');
    // return if form is invalid
    if (signupForm.invalid) {
      console.log('form is invalid');  
      return;
    }

    const email = signupForm.get('email').value;
    const firstName = signupForm.get('firstName').value;
    const lastName = signupForm.get('lastName').value;
    const gender = signupForm.get('gender').value;
    const address = signupForm.get('address').value;
    const password = signupForm.get('password').value;
    const profileImage = this.imageUpload
  
    this.userService.updateUser(email,firstName,lastName,password,gender,address, profileImage, [])
    alert('User updated successfully')
    this.route.navigate(['/todolist'])
  }

}
