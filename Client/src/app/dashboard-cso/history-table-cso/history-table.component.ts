import { Component, OnInit } from '@angular/core';
// import {REQUEST} from '../Mock-request'
// import {Request} from '../request'
@Component({
  selector: 'app-history-CSO',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css']
})
export class HistoryTableComponent implements OnInit {
  request:Request[];
  constructor() { }

  ngOnInit() {

    // this.request=REQUEST;
  }

}
