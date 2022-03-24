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
      let trimmedList: Task[] = []
      if (event.currentIndex < event.previousIndex) {
        trimmedList = event.container.data.slice(event.currentIndex,event.previousIndex+1);
        for (let i=0; i<trimmedList.length; i++) {
          trimmedList[i].display_order = event.currentIndex + i + 1;
        }
      } else {
        trimmedList = event.container.data.slice(event.previousIndex, event.currentIndex+1);
        for (let i=0; i<trimmedList.length; i++) {
          trimmedList[i].display_order = event.previousIndex + i + 1;
        }
      }
      // console.log(trimmedList);
      this.updateDisplayOrder(trimmedList);

      // console.log(trimmedList)
      return;
    }
    event.item.data.is_selected = event.container.id === "selectedtodo-drop-list" ? true : false;
    this.updateSelectionStatus(event.item.data);

  }

  updateDisplayOrder(trimmedList: Task[]): void {
    this._todoApi.updateDisplayOrder(trimmedList).subscribe((response) => {
      if (response.success) {
        // console.log("Updated Order : ",response.data);
        this.getSelectedTasks();
      }
      else {
        console.log("Selection Error: ",response.data);
      }
    })
  }

  toggleSelection(task: Task): void {
    task.is_selected = !task.is_selected;
    this.updateSelectionStatus(task);
  }

  updateSelectionStatus(task: Task): void {
    // console.log(task);
    this._todoApi.updateSelectionStatus(task).subscribe((response) => {
      if (response.success) {
        // console.log("Selection : ",response.data);
        this.getAllTasks();
        this.getSelectedTasks();
      }
      else {
        console.log("Selection Error: ",response.data);
      }
    })
  }

  getAllTasks(): void {
    this._todoApi.getAllTasks().subscribe((response) => {
      if (response.success) {
        // console.log("getAllTasks : ",response.data);
        this.taskList = response.data;
      }
      else {
        console.log("getAllTasks Error: ",response.data);
      }
    })
  }

  getSelectedTasks(): void {
    this._todoApi.getSelectedTasks().subscribe((response) => {
      if (response.success) {
        // console.log("getSelectedTasks : ",response.data);
        this.selectedTaskList = response.data;
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
        this.newTask = "";
        // console.log('New Task: ', response.data);
        this.getAllTasks();
      }
      else {
        console.log("New Task Error: ",response.data);
      }
    })
  }
}
