import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/employee';

import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  imageSrc: string = '';
  displayedColumns = [
    'id',
    'employee_name',
    'employee_age',
    'employee_salary',
    'profile_image',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;
  //public dataSource = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input('controlName') formControlName!: string;

  //employees: any[]=[];
  employees: any;
  emp: any;
  myForm!:FormGroup;


  constructor(
    private http: HttpClient,
    private formbuilder: FormBuilder,
    public employeeService: EmployeeService
  ) {}


  ngOnInit(): void {
    this.emp = [];
    this.getEmployees();

    this.myForm = this.formbuilder.group({
      employee_name:['',
        Validators.required,
        Validators.minLength(3)
      ],
      employee_age:['',Validators.required],
      employee_salary: ['',Validators.required]
    });
  }


  private getEmployees() {
    this.employeeService.Employees().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      console.log('data', res.data);
    });
  }

  addEmp(){

    this.dataSource.data.push(this.myForm.value);
    this.dataSource.filter="";
    alert("Employee added Successfully");


    console.log(this.myForm.value);

  }
    deleteEmployee(index: number) {
      console.log(index);
      this.dataSource.data.splice(index,1);
      this.dataSource.filter="";

    }



  applyFilter($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  reset() {
    this.myForm.reset();
  }
}

