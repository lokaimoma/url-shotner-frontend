import { Component, OnInit, OnDestroy } from '@angular/core';
import { UrlBoardService } from 'src/app/services/url-board.service';
import { URLBoardState } from 'src/app/states/screen';

@Component({
  selector: 'linksly-urlboard',
  templateUrl: './urlboard.component.html',
  styleUrls: ['./urlboard.component.css'],
})
export class UrlboardComponent implements OnInit, OnDestroy {
  state: URLBoardState = new URLBoardState();

  constructor(service: UrlBoardService) {
    // TODO : Handle pagination
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
