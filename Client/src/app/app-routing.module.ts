import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{HistoryTableComponent} from'./dashboard-cso/history-table-cso/history-table.component';
import{HistoryComponent} from'./dashboard-authority/history-table-authority/history.component';

import{RequestFormComponent} from './dashboard-bu/request-form-bu/request-form.component';
import{CsoUserComponent} from './dashboard-cso/cso-user/cso-user.component';
import{AddBuildingComponent}from './dashboard-master/add-building-master/add-building.component'
import{AddFloorComponent} from './dashboard-cso/add-floor/add-floor.component';
import{ViewFloorsComponent} from './dashboard-cso/view-floors/view-floors.component';
import{EditFloorComponent} from './dashboard-cso/edit-floor/edit-floor.component';

import { HomeMasterComponent } from './dashboard-master/home-master/home-master.component';
import { BuildingHomeComponent } from './dashboard-master/building-home/building-home.component';
import { UpdateLocationComponent } from './dashboard-master/update-location/update-location.component';

import{LocationStructureComponent} from './dashboard-master/location-structure-master/location-structure.component';
import{HomeComponent} from './shared/component/home/home.component';
import{CurrentAllocationComponent} from './dashboard-cso/current-allocation-cso/current-allocation.component';
import{DashboardCSOComponent}from'./dashboard-cso/dashboard-cso.component';
import{SidenavComponent}from'./dashboard-bu/sidenav.component';
import{DashboardMasterComponent}from'./dashboard-master/dashboard-master.component';
import{DashboardAuthorityComponent}from'./dashboard-authority/dashboard-authority.component';
import {LoginComponent} from './shared/component/login/login.component';
import { AuthorityHistoryComponent } from "./dashboard-authority/authority-history/authority-history.component";
import { ErrorPageComponent } from "./shared/component/error-page/error-page.component";
import { HistoryBusinessUserComponent } from "./dashboard-bu/history/history.component";
import { ReleaseRequestComponent } from "./dashboard-bu/release-request/release-request.component";
import { GetSeatInfo } from "./dashboard-cso/get-seat-info/get-seat-info.component";






const routes: Routes=[
 //{path:'',redirectTo:'/app-login/:value',pathMatch:'full'},



{path:'app-dashboard-cso',component:DashboardCSOComponent,
children:[
{ path:'app-home',component:HomeComponent},
{path:'app-cso-user',component:CsoUserComponent,
children:[
 { path:'get-seat-info/:requestId', component:GetSeatInfo}
]},
{ path:'app-history-CSO',component:HistoryTableComponent},
{path:'',redirectTo:'/app-dashboard-cso/app-cso-user',pathMatch:'full'},
{path:'app-current-allocation',component:CurrentAllocationComponent},
{path:'add-floor',component:AddFloorComponent},
{path:'view-floor',component:ViewFloorsComponent},
{path:'edit-floor/:floorCode',component:EditFloorComponent}
]
},


{ path:'app-dashboard-master',component:DashboardMasterComponent,
children:[
  { path:'app-home-master',component:HomeMasterComponent},
  { path:'location-structure',component:LocationStructureComponent},
  // { path:'add-floor',component:AddFloorComponent},
  { path:'add-building',component:AddBuildingComponent},
  //{ path:'app-home-master',component:HomeMasterComponent},
  {path:'',redirectTo:'/app-dashboard-master/app-home-master',pathMatch:'full'},
  { path:'app-building-home/:id',component:BuildingHomeComponent},
  { path:'update-location',component:UpdateLocationComponent},

]
},

{path:'app-dashboard-authority',component:DashboardAuthorityComponent,
children:[
{path:'app-history',component:HistoryComponent},
   { path:'app-home',component:HomeComponent},
   {path:'app-authority-history',component:AuthorityHistoryComponent},
   {path:'app-error-page',component:ErrorPageComponent}




]},

{path:'app-login/:value',component:LoginComponent},
  {path:'app-sidenav',component:SidenavComponent,
  	children:[
    { path:'app-home',component:HomeComponent},
    {path:'',redirectTo:'/app-sidenav/app-history',pathMatch:'full'},
  	 
  {path:'request-form',component:RequestFormComponent},
  {path:'app-history',component:HistoryBusinessUserComponent},
  {path:'app-release-request',component:ReleaseRequestComponent},
 { path:'app-history-authority',component:HistoryComponent},
 {path:'app-error-page',component:ErrorPageComponent}
  	]
  },

 //{path:'request-form',component:RequestFormComponent},

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
  export class AppRoutingModule {}