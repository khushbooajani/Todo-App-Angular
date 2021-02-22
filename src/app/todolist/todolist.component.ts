import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { TodoList, User } from '../user/user.model';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['../user/user.component.css','./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  $:any;
  currentUser: User;
  addTodoFlag: boolean = false;
  editTodoName : string;
  subscription: Subscription;
  tasksForDelete: any[] = []
  searchtext: string =""
  status: string ='';
  category: string='';
  //faEdit = faEdit
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser( sessionStorage.getItem('email'))
    this.subscription = this.userService.taskChanged
            .subscribe((todo: TodoList[]) => {
              this.currentUser.todoList = todo
             });
  }

  openModal(){
    this.editTodoName = ''
    console.log('todoList->openModal->editTodoName=' + this.editTodoName);
    this.addTodoFlag = true
  }

  openModalForEdit(todoName:string){
    this.editTodoName= todoName;
    console.log('todoList->openModalForEdit->editTodoName=' + this.editTodoName);
    this.addTodoFlag = true
  }

  addtodofordelete(event: any, taskName:string){
    if(event.target.checked && !this.tasksForDelete.includes(taskName)){
      this.tasksForDelete.push(taskName)
    }else{
      this.tasksForDelete.splice(this.tasksForDelete.indexOf(taskName),1)
    }
  }

  deleteSelectedTodos(){
    if(this.tasksForDelete.length > 0) {
      this.userService.deleteTasks(this.tasksForDelete)
    }
    this.tasksForDelete = []
  }

  displayTodo(){
    // ToDo display 
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
    content.style.maxHeight = null;
    } else {
    content.style.maxHeight = content.scrollHeight + "px";
    } 
});
}
// Todo display end
  }

}
