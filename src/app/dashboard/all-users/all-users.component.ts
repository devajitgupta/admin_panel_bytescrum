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

  roles=['admin', 'manager','employee'];

  Employee:Employee[]=[];
  //selectedEmployeeRole!:Employee
  selectedEmployeeRole: { id: string, role: string } = { id: '', role: '' };
  

  constructor(
    private router: Router, private api: EmployeeService, private fb: FormBuilder
  ) {
    
   }



  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    const token = localStorage.getItem('token');
    if (token) {
      this.api.getAllUsers().subscribe(
        (data: any) => {
          console.log(data);
          this.Employee=data;
        },
        (error) => {
          // Handle error scenarios
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(){
    console.log(this.selectedEmployeeRole);
    this.api.updateUser(this.selectedEmployeeRole).subscribe((data)=>{
      console.log("Role data updated", data);
      this.getAllUsers();
      
    })

  }
  onDelete(emp:any, i: any) {
    console.log(emp)
    if (window.confirm('do you want to delete data')) {
      console.log("deleted data " + emp);
      this.api.deleteUser(emp).subscribe(data => {
        this.Employee.splice(i, 1);
      });
    }
  }

}
