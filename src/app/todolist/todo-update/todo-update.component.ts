import { NullTemplateVisitor } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, Output, SimpleChanges, ViewChild, EventEmitter, ComponentRef } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { TodoList, User } from 'src/app/user/user.model';
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./../todolist.component.css', './todo-update.component.css']
})
export class TodoUpdateComponent implements OnInit {
  @ViewChild('closeBtn',  { static: false }) closeBtn: ElementRef;
  @Input() addTodoFlag:Boolean

  todoForm: FormGroup;
  currentTodo: TodoList
  currentUser: User
  ref: ComponentRef<any>
  @Input() editName: string
  @Output() editNameChange = new EventEmitter<string>();
  
  constructor(private userService: UserService, private elementRef :ElementRef) { }

  ngOnInit(): void {
    // this.subscription = this.edittodo
    // .subscribe((todoName: string) => {
    //   this.edittodo = todoName
    //  });
    console.log('in todo update component ngOnInit editName value - ' + this.editName);
    
    this.currentUser = this.userService.getUser( sessionStorage.getItem('email'))
    this.currentTodo = this.userService.todoExists(this.currentUser, this.editName)
    
    if(this.currentTodo !== undefined)  {
      this.todoForm = new FormGroup({
        taskName: new FormControl(this.currentTodo.taskName, [Validators.required]),
        category: new FormControl(this.currentTodo.category, [Validators.required]),
        public: new FormControl(this.currentTodo.isPublic, [Validators.required]),
        status: new FormControl(this.currentTodo.status, [Validators.required]),
        date: new FormControl(this.currentTodo.date, [Validators.required]),
        isReminder: new FormControl(this.currentTodo.isReminder, [Validators.required]),
        reminderDate: new FormControl(this.currentTodo.reminderDate),
        //todoImage: new FormControl('')
      });
    }
    else{
      this.todoForm = new FormGroup({ 
        taskName: new FormControl(null, [Validators.required]),
        category: new FormControl(null, [Validators.required]),
        public: new FormControl(null, [Validators.required]),
        status: new FormControl(null, [Validators.required]),
        date: new FormControl(null, [Validators.required]),
        isReminder: new FormControl(null, [Validators.required]),
        reminderDate: new FormControl(NullTemplateVisitor),
        //todoImage: new FormControl('')
      });
    }
  }

ngOnChanges(changes: SimpleChanges): void {
  console.log('in todo update component ngOnChanges editName value - ' + this.editName);
  this.ngOnInit();
}

  ontodoSubmit(todoForm) {
    console.log('form submitted');
    // return if form is invalid
    if (todoForm.invalid) {
      console.log('form is invalid');
      return;
    }

    const taskName = todoForm.get('taskName').value;
    const category = todoForm.get('category').value;
    const isPublic = todoForm.get('public').value;
    const status = todoForm.get('status').value;
    const date = todoForm.get('date').value;
    const isReminder = todoForm.get('isReminder').value;
    const reminderDate =todoForm.get('reminderDate').value; ;
    //const todoImage =todoForm.get('todoImage').value; 
    let editModeFlag = this.editName === '' ? false : true
    this.userService.saveTask(taskName,category,isPublic,status,date,isReminder,reminderDate,editModeFlag)
    todoForm.reset();
    this.editName = ""
    this.editNameChange.emit(this.editName)
    this.closeBtn.nativeElement.click();
    this.addTodoFlag = false
  }

  close(){
    this.editName = ""
    this.editNameChange.emit(this.editName)
    this.todoForm.reset()
  }


}
