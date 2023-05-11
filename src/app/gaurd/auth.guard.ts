import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private api:EmployeeService,private router:Router){}
  canActivate():boolean{
  	if(this.api.loggedIn()){
  		return true;

  	}else{
  		this.router.navigate(["login"]);
  		return false;

  	}
  }
  
}