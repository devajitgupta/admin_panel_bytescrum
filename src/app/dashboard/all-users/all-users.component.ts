import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Employee } from 'src/app/employee';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  employee: Employee[] = [];
  constructor(
    private router: Router, private api: EmployeeService, private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const token = localStorage.getItem('token');
    if (token) {
      this.api.getUsers().subscribe(employee => {
        this.employee = employee;
      })
    }
  }




}
