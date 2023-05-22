import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/employee';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-all-manager-routes',
  templateUrl: './all-manager-routes.component.html',
  styleUrls: ['./all-manager-routes.component.css']
})
export class AllManagerRoutesComponent {
  manager:Employee[]=[];

  roles=['manager','employee'];

  Employee:Employee[]=[];
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
      this.api.getManagerRoutesData().subscribe(
        (data: any) => {
          console.log(data);
          this.manager=data;
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
    

  }

  onDelete(mg:any, i: any) {

    if (window.confirm('do you want to delete data')) {
      console.log("deleted data " + mg);
      this.api.deleteUser(mg).subscribe(data => {
        this.Employee.splice(i, 1);
      });
    }
  }

}
