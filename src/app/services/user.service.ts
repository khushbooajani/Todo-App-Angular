import { Injectable, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { User,TodoList } from "../user/user.model";

@Injectable({
    providedIn: 'root'
  })
export class UserService{

  
constructor(private route:Router) { }

taskChanged = new Subject<TodoList[]>();
@Output() loginFlag: EventEmitter<any> = new EventEmitter();

    signOutUser() {
      sessionStorage.removeItem('email');
      this.loginFlag.emit(false);
      this.route.navigate(['/user/signin'])
    }

    LoggedInUser() {
      return sessionStorage.getItem('email');
    }

    deleteTasks(tasksForDelete: string[]) {
      let user = this.getUser(sessionStorage.getItem('email'));
    
      let todolist = user.todoList.filter((todo) => {
        return !tasksForDelete.includes(todo.taskName)
           
      })
    
      user.todoList = todolist;
      this.storeUser(user);
      console.log(user);
      this.taskChanged.next(user.todoList)
    
    }

  saveTask(taskName: any, category: any, isPublic: any, status: any, date: any, isReminder: any, reminderDate: any, editModeFlag:any) {
    let currentUser = this.getUser(sessionStorage.getItem('email'));    
    let todo = new TodoList(taskName,category,isPublic,status,date,isReminder,reminderDate);
    if(currentUser.todoList.length !== 0){
      var existingTodoName = this.todoExists(currentUser, todo.taskName)
    }
    if(editModeFlag){
      let updatedList = currentUser.todoList.filter(todo => {return todo.taskName !== existingTodoName.taskName})
      updatedList.push(todo)
      currentUser.todoList = updatedList
      localStorage.setItem(sessionStorage.getItem('email'), JSON.stringify(currentUser));
      this.taskChanged.next(currentUser.todoList)
      alert("Task saved")
    }
    
    if(existingTodoName === undefined && !editModeFlag){
      currentUser.todoList.push(todo)
      localStorage.setItem(sessionStorage.getItem('email'), JSON.stringify(currentUser));
      console.log(currentUser.todoList);
      this.taskChanged.next(currentUser.todoList)
      
      // $('#addTaskModal').modal('hide');
    }
    else if(!editModeFlag && existingTodoName !== undefined){
      alert("Task name already exists")
    }
  }
  
  todoExists(user, todoname){
    return user.todoList.find(function(todoEle) { return todoEle.taskName === todoname }  )
  }


  loginUser(email, password) {
    let user  = this.getUser(email)
    if(user && user.password === password){
      console.log('user found');
      sessionStorage.setItem("email", email);
      this.loginFlag.emit(true);
      this.route.navigate(['/todolist']) 
    }else{
      alert('invalid username/password')
    }
  }

    createUser(email,firstName,lastName,password,gender,address,profileImage,todoList){
        let user;
        let fileReader = new FileReader();
        if(profileImage === undefined){
          profileImage = "../../assets/images/Dummy-image";
          user = new User(email,firstName,lastName,password,gender,address,profileImage,todoList);
          this.storeUser(user);          
        }
        else{
          fileReader.readAsDataURL(profileImage[0])
          fileReader.onloadend = ()=> {
            user = new User(email,firstName,lastName,password,gender,address,fileReader.result,todoList); 
            this.storeUser(user);
          }
        }
        
        this.route.navigate(['/user/signin'])
    }

    updateUser(email,firstName,lastName,password,gender,address,profileImage,todoList){
        let userToUpdate = this.getUser(email)
        console.log(userToUpdate);
        userToUpdate.email = email;
        userToUpdate.firstName = firstName;
        userToUpdate.lastName = lastName;
        userToUpdate.password = password;
        userToUpdate.gender = gender;
        userToUpdate.address = address;

        let fileReader = new FileReader();
        if(profileImage === undefined){
          profileImage = "../../assets/images/Dummy-image.png";
          userToUpdate.profileImage = profileImage; 
          this.storeUser(userToUpdate);          
        }
        else{
          fileReader.readAsDataURL(profileImage[0])
          fileReader.onloadend = ()=> {
            userToUpdate.profileImage = fileReader.result; 
            this.storeUser(userToUpdate);
          }
        }
        this.route.navigate(['/todolist'])
    }

    storeUser(user){
        // if(localStorage.getItem(user.email) == null){
          localStorage.setItem(user.email, JSON.stringify(user));
          console.log('user added successfully');
        // }
    }

    getUser(email){
          let currentUser = JSON.parse(localStorage.getItem(email));
          console.log('user found in storage');
          return currentUser;
    }
}