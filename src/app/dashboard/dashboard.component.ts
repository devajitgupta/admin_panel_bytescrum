import { Component } from '@angular/core';
import { Employee } from '../employee';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  id!: number
  regForm!: any
  Employee: Employee[] = [];
  isloggedin = false;
  employee: Employee[] = []
  //Login: Login[] = []




  constructor(private api: EmployeeService, private router: Router, public fb: FormBuilder) {
    this.mainForm();
  }
  mainForm() {
    this.regForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    
    this.mainForm();
  }
  successNotification() {
    Swal.fire('Hi', 'We have been informed!', 'success');
  }

  userLsogin() {

    console.log("user login");
    this.api.createLogin(this.regForm.value).subscribe(res => {
      if (res.success) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['employee-details'])

      }
      //this.router.navigate([`/employee-details/${res.id}`]);
    }, err => {
      alert("Login failed")
    })
  }
  //-------------------------manager
  userLogin() {
    return this.api.createLogin(this.regForm.value).subscribe(
      (res) => {
        console.log(res);
        const token = res.token;
        const role = res.role;
        console.log(role);
        localStorage.setItem('token', token);
  
        if (role === 'admin') {
          this.router.navigate(['all-users']);
        } else if (role === 'manager') {
          this.router.navigate(['']);
        } else if (role === 'employee') {
          this.router.navigate(['employee-details']);
        } else {
          console.log("Unknown role. Access denied."); // Handle the case when the role is not recognized
        }
      },
      (error) => {
        console.error("Login failed", error);
      }
    );
  }
  
  userrLogin() {
    console.log("user login");
    this.api.createLogin(this.regForm.value).subscribe(res => {
      console.log(res);

      console.log();
      if (res.role === 'admin') {
        localStorage.setItem('token', res.token);
        this.router.navigate(['all-users']);
        return; // Exit the function after navigating
      }
      
      // Further code for non-admin and non-employee roles
      console.log("User is not an admin or employee");
    }, err => {
      alert("Login failed");
    });
  }
  

  onDelete() { }
  onEdit() { }

}
