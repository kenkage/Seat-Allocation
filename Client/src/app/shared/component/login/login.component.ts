import { Component, OnInit } from '@angular/core';
import{Router,ActivatedRoute} from '@angular/router';
import { EmpInfo } from "../../model/emp-info";
import { ConfigFile } from "../../../config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	emp:EmpInfo = new EmpInfo("","","","","","");
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {

	this.route.params.subscribe(params=>this.decodeToken(params));
  }

  login(emp){
  		if(emp.role==ConfigFile.keys.user){
  				 this.router.navigate(['/app-sidenav']);
  		}
  		else if(false){
  			// this.router.navigate(['/app-dashboard-authority']);

  		}
  	 else if(emp.role==ConfigFile.keys.csoControl){
		   
  	 	this.router.navigate(['/app-dashboard-cso']);

  		}
  		else if(emp.role==ConfigFile.keys.assetControl){
  	 	 this.router.navigate(['/app-dashboard-master']);
  		}
  		else{
  			alert("invalid user");
  		}
  }

  //this method is used for decoding the token
 decodeToken(token:any){
	 console.log(JSON.stringify(token));
	
	  var tokendata=JSON.parse(token["value"]).token;
	  var base64Url = tokendata.split('.')[1];
	  var base64 = base64Url.replace('-', '+').replace('_', '/');
	  var payload=JSON.parse(window.atob(base64));
	  this.emp.empCode=payload["sid"];
	  this.emp.empName=payload["sub"];
	  this.emp.Email=payload["email"];
	  this.emp.role=payload["typ"];
	  this.emp.valid=payload["prn"];
	  this.emp.superVCode = payload["amr"];
	  sessionStorage.setItem("empid",this.emp.empCode);
	  localStorage.setItem("token",tokendata);
	  this.login(this.emp);
	  
	}

}
