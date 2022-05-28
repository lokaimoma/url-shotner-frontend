import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UrlBoardService } from 'src/app/services/url-board.service';
import { URLBoardState } from 'src/app/states/screen';

@Component({
  selector: 'linksly-urlboard',
  templateUrl: './urlboard.component.html',
  styleUrls: ['./urlboard.component.css'],
})
export class UrlboardComponent implements OnInit, OnDestroy {
  state: URLBoardState;

  constructor(service: UrlBoardService, fb: FormBuilder) {
    // TODO : Handle pagination
    this.state = new URLBoardState(fb);
    service
      .fetchUrls()
      .then((d) => (this.state.urls = d.results))
      .catch((_) => {
        this.state.fetchUrlsError = 'Error fetching your urls';
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
