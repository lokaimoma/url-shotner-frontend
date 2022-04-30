import { Component } from '@angular/core';
import { MainScreenState } from 'src/app/states/screen';

@Component({
  selector: 'linksly-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  state = new MainScreenState();

  constructor() {}
}
