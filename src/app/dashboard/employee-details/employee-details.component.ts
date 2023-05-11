import { Component } from '@angular/core';
import { Employee } from 'src/app/employee';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  id!: string
  employee!: Employee;
  data!: Employee

  constructor(private api: EmployeeService, public route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    const token = localStorage.getItem('token');
    if (token) {
      this.api.getProfile().subscribe(res => {
          this.data = res.data;

      });
    }else{
      this.router.navigate(['/login'])
    }
  }

  logout(){
    return this.api.LogOut();
    this.router.navigate(['/login'])
  }



}






/*
editListing(){
      this.id=this.route.snapshot.paramMap.get("id");
      if(this.editUserForm.valid){
        this.api.(this.editListingForm.value,this.id).subscribe(res=>{
          this.editListingForm.reset();
          this.router.navigate(["/listings"]);
        });

      }


}
removeListing(){
  this.id=this.route.snapshot.paramMap.get("id");
  this.listingService.deleteListing(this.id).subscribe(res=>{
    console.log(res);
    this.router.navigate(["/listings"]);
  })
}
*/
