import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class ToDoHomeService {

  // baseUrl = 'http://localhost:8080/'
  baseUrl = 'https://evening-lake-44734.herokuapp.com/'
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  constructor(private _http: HttpClient) { }

  getAllTasks(): Observable<any> {
    return this._http.get(this.baseUrl + 'getAllTasks/', { headers: this.httpHeaders });
  }

  getSelectedTasks(): Observable<any> {
    return this._http.get(this.baseUrl + 'getSelectedTasks/', { headers: this.httpHeaders });
  }


  addNewTask(newTaskName: string): Observable<any> {
    let body = {
      task_name: newTaskName,
    }
    return this._http.post(this.baseUrl + 'addNewTask/', body, { headers: this.httpHeaders });
  }

  updateSelectionStatus(task: Task): Observable<any> {
    console.log(task);
    return this._http.patch(this.baseUrl + 'updateSelectionStatus/', task, { headers: this.httpHeaders });
  }

  updateDisplayOrder(taskList: Task[]): Observable<any> {
    console.log(taskList);
    return this._http.patch(this.baseUrl + 'updateDisplayOrder/', taskList, { headers: this.httpHeaders });
  }
}
