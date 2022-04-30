import { Component } from '@angular/core';
import { AuthStorageService } from 'src/app/services/auth-storage.service';
import { MainScreenState } from 'src/app/states/screen';

@Component({
  selector: 'linksly-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  state = new MainScreenState();

  constructor(private as: AuthStorageService) {
    const u = as.getUserInfo();
    this.state.username = u!.username;
  }
}
