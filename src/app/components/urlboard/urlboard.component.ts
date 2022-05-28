import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UrlBoardService } from 'src/app/services/url-board.service';
import { URLBoardState } from 'src/app/states/screen';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'linksly-urlboard',
  templateUrl: './urlboard.component.html',
  styleUrls: ['./urlboard.component.css'],
})
export class UrlboardComponent {
  state: URLBoardState;

  constructor(private service: UrlBoardService, fb: FormBuilder) {
    // TODO : Handle pagination
    this.state = new URLBoardState(fb);
    this.service
      .fetchUrls()
      .then((d) => (this.state.urls = d.results))
      .catch((_) => {
        this.state.fetchUrlsError = 'Error fetching your urls';
      });
  }

  onSubmit() {
    this.state.processingRequest = true;
    setTimeout(
      () => {
        this.service
          .shortenUrl(this.state.form.get('url')?.value)
          .then((d) => this.state.urls?.unshift(d))
          .catch((e) => console.log(e))
          .finally(() => (this.state.processingRequest = false));
      },
      environment.production ? 0 : 3000
    );
  }
}
