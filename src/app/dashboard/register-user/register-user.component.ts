import { Component } from '@angular/core';
import { Employee } from 'src/app/employee';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service'; 
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  regForm!:FormGroup;
  Employee: Employee[] = [];



  

  constructor(private Toster:ToastrService,private api:EmployeeService,private router:Router,public fb: FormBuilder){
    this.mainForm();
  }
  mainForm(){
    this.regForm=this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]

    })
  }

  onSubmit(){
    console.log(this.regForm.value);
      this.api.AddUsers(this.regForm.value).subscribe(res=>{
        this.Toster.success("Registered Successfully")
        console.log(res);
<<<<<<< HEAD
        this.router.navigate(['/login'])
      });
    
    
=======
        this.regForm.reset();
        this.router.navigate(["/all-users"])
      })
    }
>>>>>>> 4b2b0ac483a86756ad66bb68c17c24df855eb74e
  }

}
