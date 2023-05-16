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
  employee:any={
    name:'',
    email:'',
    role:''
  }
  myControl = new FormControl();
  roles: string[] = ['admin', 'manager', 'employee'];
  selectedRole!: string;
  empId:any;
  isEditMode=false;
  regForm!: FormGroup
  showEditForm=false
  editUserId: any;
  AfterSelectValue: any;
  constructor(private router: Router, private api: EmployeeService, private fb: FormBuilder) {
    


  }
  ngOnInit(): void {
    this.getUsers();
    this.mainForm();
    this.setForm();
   
  }
  
  setForm() {
    this.api.selectedEmp = {
      id: "",
      name: "",
      email: "",
      password:"",
      role: ""
    }
  };


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
        this.employee = Object.values(data);
        console.log(this.employee)
      });
  }
  mainForm() {
    this.regForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });

  }



  onEdit(empId: any) {
    
    this.isEditMode=true
    this.api.selectedEmp = empId
    console.log(empId)
    this.editUserId = empId.id
    this.regForm.setValue({
      name: empId.name,
      email: empId.email,
      role: empId.role
    });

  }
  // set form 
  onSsubmit(empId:any) {
    this.api.updateEmp(this.editUserId,this.regForm.value).subscribe((res)=>{
      console.log("User Data Updated");
      this.getUsers();
      this.showEditForm=false

    });
 

  }
  onSubmit() {
    this.regForm.patchValue({ role: this.selectedRole });
    this.api.updateEmp(this.editUserId, this.regForm.value).subscribe((res) => {
      console.log("User Data Updated");
      this.getUsers();
      this.showEditForm = false;
    });
  }

  
  


  
  onChange(AfterSelectValue:any){
    console.log(AfterSelectValue);
    this.AfterSelectValue=AfterSelectValue
  }
  
}
