import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Employee } from 'src/app/employee';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  regForm!: FormGroup;
  userId:any;
  roles = ['admin', 'manager', 'employee'];
  // selected empId 
  Employee: Employee[] = [];
  selectedEmployeeId!: string;

  //selectedEmployeeRole: { id: string, role: string } = { id: '', role: '' };


  constructor(
    private router: Router, private api: EmployeeService, private fb: FormBuilder,
    private route: ActivatedRoute,

  ) {

  }



  ngOnInit() {
    

    this.getAllUsers();
    this.mainForm();
  }
  mainForm() {
    this.regForm = this.fb.group({

      role: ['', [Validators.required]]

    })
  };
  getAllUsers() {
    const token = localStorage.getItem('token');
    if (token) {
      this.api.getAllUsers().subscribe(
        (data: any) => {
          console.log(data);
          this.Employee = data;
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
    console.log(this.regForm.value.id);
    const { role } = this.regForm.value;
    const updatedEmployee = {
      _id: this.selectedEmployeeId,
      name:'',
      email:'',
      password:'',
      role: role
    };

    this.api.updateEmployee(updatedEmployee).subscribe(res=>{
      console.log("response");

      console.log(res);
    })
  }

  onDelete(emp: any, i: any) {
    console.log(emp)
    if (window.confirm('do you want to delete data')) {
      console.log("deleted data " + emp);
      this.api.deleteUser(emp).subscribe(data => {
        this.Employee.splice(i, 1);
      });
    }
  }

  onEdit(emp:Employee) {
    this.selectedEmployeeId=emp._id;
    console.log(emp._id)
   // this.api.selectedEmpId = userId
    this.regForm.patchValue({
      emp
    });
  }

  //can't see yr full screen open chrome
  

}
