import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private EmpUrl = 'https://dummy.restapiexample.com/api/v1/employees';

  constructor(private http: HttpClient) {}

  // Employees():Observable<Employee[]>{
  //   return this.http.get<Employee[]>(this.EmpUrl);

  // }
  Employees() {
    return this.http.get(this.EmpUrl);
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(
      'https://dummy.restapiexample.com/api/v1/employees' + id
    );
  }
}
