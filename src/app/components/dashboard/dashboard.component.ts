import { Component, OnInit } from '@angular/core';
import { DashBoardService } from 'src/app/services/dash-board.service';
import { DashBoardState } from 'src/app/states/screen';

@Component({
  selector: 'linksly-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(service: DashBoardService) {
    this.state = service.state;
  }

  state: DashBoardState;

  ngOnInit(): void {}
}
