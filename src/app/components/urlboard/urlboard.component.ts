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
        this.state.fetchUrlsError = true;
      });
  }

  onSubmit() {
    this.state.processingRequest = true;
    setTimeout(
      () => {
        this.state.requestError = false;
        this.service
          .shortenUrl(this.state.form.get('url')?.value)
          .then((d) => {
            this.state.urls?.unshift(d);
            this.state.form.reset();
          })
          .catch((_) => (this.state.requestError = true))
          .finally(() => (this.state.processingRequest = false));
      },
      environment.production ? 0 : 3000
    );
  }

  onToggle(value: boolean, code: string, itemIndex: number) {
    this.service
      .toggleUrlStatus(value, code)
      .then((d) => {})
      .catch((err) => console.log(err));
  }
}
