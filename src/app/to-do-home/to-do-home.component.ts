import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToDoHomeService } from './to-do-home.service';
import { Task } from '../interfaces/task';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-to-do-home',
  templateUrl: './to-do-home.component.html',
  styleUrls: ['./to-do-home.component.css']
})
export class ToDoHomeComponent implements OnInit {

  newTask: string = "";
  taskList: Task[] = [];
  selectedTaskList: Task[] = [];

  constructor(
    private _todoApi: ToDoHomeService,
    private _cdr: ChangeDetectorRef,
    // private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.getSelectedTasks();
  }

  ngAfterViewChecked() {
    //your code to update the model
    this._cdr.detectChanges();
  }

  drop(event: CdkDragDrop<Task[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.id === "selectedtodo-drop-list") {
        console.log(event.container.id)
        event.item.data.is_selected = true;
        console.log(event.item.data);
        this.updateSelectionStatus(event.item.data);
        this.getAllTasks();
        this.getSelectedTasks();
        // copyArrayItem(
        //   event.previousContainer.data,
        //   event.container.data,
        //   event.previousIndex,
        //   event.currentIndex,
        // );
        // event.container.
        // this.selectedTaskList=this.selectedTaskList.filter((item, pos) =>{
        //   return this.selectedTaskList.indexOf(item)== pos;
        // });
      } else {
        console.log(event.container.id);
        console.log(event.item.data);
        event.item.data.is_selected = false;
        console.log(event.item.data);
        this.updateSelectionStatus(event.item.data);
        this.getAllTasks();
        this.getSelectedTasks();
      }

    }

  }

  // drop(event: CdkDragDrop<Task[]>) {
  //   console.log(this.taskList[event.previousIndex])
  //   this.taskList[event.previousIndex].is_selected = true;
  //   console.log(this.taskList[event.previousIndex])
  //   var self=this;
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   }
  //   else if(event.container.id<event.previousContainer.id){
  //     copyArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);

  //      this.taskList=this.taskList.filter(function(item, pos){
  //         return self.taskList.indexOf(item)== pos;
  //       });
  //   }
  //   else {
  //     copyArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //     this.selectedTaskList=this.selectedTaskList.filter(function(item, pos){
  //       return self.selectedTaskList.indexOf(item)== pos;
  //     });
  //   }
  // }

  toggleSelection(task: any): void {
    console.log(task);
    // task.is_selected = !task.is_selected;
    // console.log(task);
  }

  updateSelectionStatus(task: Task[]): void {
    console.log(task);
    this._todoApi.updateSelectionStatus(task).subscribe((response) => {
      if (response.success) {
        console.log("Selection : ",response);
        // this.taskList = response;
        // console.log(typeof(response));
        // console.log(typeof(this.taskList));
        // console.table(this.taskList);
      }
      else {
        console.log("Selection Error: ",response);
      }
    })
  }

  getAllTasks(): void {
    this._todoApi.getAllTasks().subscribe((response) => {
      if (response.success) {
        console.log("getAllTasks : ",response);
        this.taskList = response.data;
        // console.log(typeof(response));
        // console.log(typeof(this.taskList));
        // console.table(this.taskList);
      }
      else {
        console.log("getAllTasks Error: ",response.data);
      }
    })
  }

  getSelectedTasks(): void {
    this._todoApi.getSelectedTasks().subscribe((response) => {
      if (response.success) {
        console.log("getSelectedTasks : ",response);
        this.selectedTaskList = response.data;
        // console.table(this.selectedTaskList);
      }
      else {
        console.log("getAllTasks Error: ",response.data);
      }
    })
  }

  createNewTask(): void {
    console.log(this.newTask);
    this._todoApi.addNewTask(this.newTask).subscribe((response) => {
      if (response.success) {
        console.log('New Task: ', response.data);
        this.getAllTasks();
      }
      else {
        console.log("New Task Error: ",response.data);
      }
    })
  }
}
