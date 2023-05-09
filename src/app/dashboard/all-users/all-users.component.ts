import { Component } from '@angular/core';
import { registerEmployee } from 'src/app/registerEmployee';
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
  roles = [
    { name: "admin" },
    { name: "manager" },
    { name: "employee" }
  ];
  emp: registerEmployee[] = [];
  isEditMode = false;
  editUserId: any;
  regForm: any
  employee: registerEmployee[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'salary', 'designation', 'role'];
  dataSource!: MatTableDataSource<registerEmployee>;
  constructor(private router: Router, private api: EmployeeService, private fb: FormBuilder) {


  }
  ngOnInit(): void {
    this.getUsers();
    this.mainForm();
    this.setForm();
    

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
      salary: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })

  }



  onEdit(empId: any) {
    this.api.selectedEmp = empId;
    console.log(empId)
    this.editUserId=empId.id
    this.isEditMode=true;
    this.regForm.setValue({
      name:empId.name,
      email:empId.email,
      salary:empId.salary,
      designation:empId.designation,
      role:empId.role

    });

  }
  // set form 
  setForm() {
    this.api.selectedEmp = {
      id: "",
      name: "",
      email: "",
      salary: "",
      designation: "",
      role: ""
    }
  };

  onSubmit(empId:any){
    if(this.isEditMode){
      console.log(empId)
      
      this.api.updateEmp(empId,this.regForm.value).subscribe((res)=>{
        console.log("User Data Updated")
        this.getUsers();

      });

      
    }else{
      console.log("Error")
    }

  }

}
