import { Component } from '@angular/core';
import { Employee } from 'src/app/employee';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  regForm!: FormGroup
  isEditMode = false;
  editUserId: any;
  employee: Employee[] = [];
  constructor(private router: Router, private api: EmployeeService, private fb: FormBuilder) {


  }
  ngOnInit(): void {
    this.getUsers();
    this.mainForm();



  }


  logout() {
    return this.api.LogOut();
  }
  LoggedIn() {
    return !!localStorage.getItem("token");
  };


  getUsers() {
    console.log("get data")
    this.api.getUsers()
      .subscribe(data => {
        this.employee = data;
        console.log(this.employee)
      });
  }
  mainForm() {
    this.regForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })

  }



  onEdit(empId: Employee) {
    this.api.selectedEmp = empId
    console.log(empId)
    this.editUserId = empId;
    this.isEditMode = true;
    this.regForm.setValue({
      name: empId.name,
      email: empId.email,
      role: empId.role


    });

  }
  // set form 
  onSubmit(empId: any) {
    if (this.isEditMode) {
      console.log(empId)

      this.api.updateUser(empId, this.regForm.value).subscribe((res) => {
        console.log("User Data Updated")
        this.getUsers();

      });


    } else {
      console.log("1st")

    }

  }

}
