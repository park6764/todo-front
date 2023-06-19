import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Observable<Todo[]>;
  path = 'http://localhost:8080/';
  constructor(private http: HttpClient) {  // HttpClientModule로 연동, constructor로 불러온 다음 사용.
    this.todos = http.get<Todo[]>(this.path);
  }

  name: string = '';
  title: string = '';
  page = 'now';
  check = false;

  addTodo(name: string, title: string) {
    this.http.put(this.path + 'addTodo', { name, title });
  }

  editTodo(id: number, name: string, title: string, complete: boolean) {
    this.http.post(this.path + 'editTodo', {id, name, title, complete});
  }

  delTodo(id: number) {
    this.http.delete(this.path + 'delTodo?id=' + id);
  }

  // get : 요청받은 값이 오브젯으로 오니까 받을 타입을 지정해야한다.
  findTodo(name: string | null, title: string | null): Observable<Todo[]> | null {
    if((this.name == null || this.name === '') && (title == null || title === '')) return null;
    else if((this.name != null || this.name !== '') && (title == null || title === '')) {
      return this.http.get<Todo[]>(this.path + 'findTodo?name=' + this.name);
    } else if((this.name == null || this.name === '') && (title != null || title !== '')) {
      return this.http.get<Todo[]>(this.path + 'findTodo?title=' + this.title);
    } else {
      return this.http.get<Todo[]>(this.path + 'findTodo?name=' + this.name + '&title=' + this.title);
    }
  }
}

interface Todo {
  id: number,
  name: string,
  title: string,
  complete: boolean
}