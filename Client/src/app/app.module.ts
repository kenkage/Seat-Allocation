import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule,Routes}from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import{AppRoutingModule} from'./app-routing.module';
import{FormsModule}from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { ChartsModule } from 'ng2-charts';
import{HistoryTableComponent} from'./dashboard-cso/history-table-cso/history-table.component';

import{HistoryComponent} from'./dashboard-authority/history-table-authority/history.component';
import{AuthorityHistoryComponent} from'./dashboard-authority/authority-history/authority-history.component';
import{RequestFormComponent} from './dashboard-bu/request-form-bu/request-form.component';
import{HistoryBusinessUserComponent} from './dashboard-bu/history/history.component';
import{ReleaseRequestComponent} from './dashboard-bu/release-request/release-request.component';
import{CsoUserComponent} from './dashboard-cso/cso-user/cso-user.component';
import{GetSeatInfo} from './dashboard-cso/get-seat-info/get-seat-info.component';
import{AddBuildingComponent}from './dashboard-master/add-building-master/add-building.component'
import{LocationStructureComponent} from './dashboard-master/location-structure-master/location-structure.component';
import{HomeComponent} from './shared/component/home/home.component';
import{CurrentAllocationComponent} from './dashboard-cso/current-allocation-cso/current-allocation.component';
import{DashboardCSOComponent}from'./dashboard-cso/dashboard-cso.component';
import{SidenavComponent}from'./dashboard-bu/sidenav.component';
import{DashboardMasterComponent}from'./dashboard-master/dashboard-master.component';
import{DashboardAuthorityComponent}from'./dashboard-authority/dashboard-authority.component';
import {LoginComponent} from './shared/component/login/login.component';
import { AddFloorComponent } from "./dashboard-cso/add-floor/add-floor.component";
import { HomeMasterComponent } from './dashboard-master/home-master/home-master.component';
import { BuildingHomeComponent } from './dashboard-master/building-home/building-home.component';
import { UpdateLocationComponent } from './dashboard-master/update-location/update-location.component';
import { UpdateBuildingComponent } from './dashboard-master/update-building/update-building.component';
import{ApprovingAuthorityService} from './shared/services/approving-authority.service';
import{AddBuildingService} from './shared/services/add-building.service';
import{AddFloorService} from './shared/services/add-floor.service';
import{LocationStructureService} from'./shared/services/location-structure.service';
import{CcCodeService} from './shared/services/cc-code.service';
import{EntityService}from './shared/services/entity.service';
import{RequestService} from './shared/services/request.service';
import{RequestTransactionService} from './shared/services/request-transaction.service';
import { ViewFloorsComponent } from './dashboard-cso/view-floors/view-floors.component';
import { EditFloorComponent } from './dashboard-cso/edit-floor/edit-floor.component';
import{ErrorPageComponent} from './shared/component/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardCSOComponent,
    DashboardAuthorityComponent,
    HistoryTableComponent,
    DashboardMasterComponent,
    HistoryComponent,
    RequestFormComponent,
    CsoUserComponent,
    AddBuildingComponent,
    AddFloorComponent,
    LocationStructureComponent,
    HomeComponent,
    CurrentAllocationComponent,
    LoginComponent,AddFloorComponent, ViewFloorsComponent, EditFloorComponent,ErrorPageComponent,AuthorityHistoryComponent
    ,ReleaseRequestComponent,HistoryBusinessUserComponent,HomeMasterComponent,BuildingHomeComponent,UpdateLocationComponent,
    UpdateBuildingComponent,GetSeatInfo

  ],
  imports: [
 
    BrowserModule,
    Ng2SmartTableModule,
    FormsModule,
    ChartsModule,AppRoutingModule,BrowserAnimationsModule
  ],
  providers: [ApprovingAuthorityService,AddBuildingService,AddFloorService,LocationStructureService,CcCodeService,EntityService,
    RequestService,RequestTransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
