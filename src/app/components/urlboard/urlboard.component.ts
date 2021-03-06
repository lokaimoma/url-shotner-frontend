import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UrlBoardService } from 'src/app/services/url-board.service';
import { URLBoardState } from 'src/app/states/screen';
import { environment } from 'src/environments/environment';
import { EventType } from '../reusables/event-notifier/event-notifier.component';

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

  onToggle(value: boolean, code: string) {
    const eventIndex = this.state.events.length;
    this.state.events.push({
      message: 'Updating url status',
      type: EventType.INPROGRESS,
    });
    setTimeout(
      () => {
        this.service
          .toggleUrlStatus(value, code)
          .then(
            (_) =>
              (this.state.events[eventIndex] = {
                message: 'URL status updated',
                type: EventType.SUCCESS,
              })
          )
          .catch(
            (_) =>
              (this.state.events[eventIndex] = {
                message: 'Error updating url status',
                type: EventType.ERROR,
              })
          )
          .finally(() =>
            setTimeout(() => {
              // Event has to be removed, but using slice causes loss of reference
              // A better solution will be added later
              // If you have a better way to do it without losing reference, you can
              // add it
              this.state.events[eventIndex] = {
                message: null,
                type: EventType.NONE,
              };
            }, 3000)
          );
      },
      environment.production ? 0 : 3000
    );
  }

  handleCopy(code: string) {
    const url = `${environment.API_URL}/${code}/`;
    const lastIndex = this.state.events.length;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        this.state.events.push({
          message: 'Link copied successfully',
          type: EventType.INFO,
        });
      })
      .catch((_) =>
        this.state.events.push({
          message: 'An error occured whiles copying to clipboard',
          type: EventType.ERROR,
        })
      )
      .finally(() =>
        setTimeout(
          () =>
            (this.state.events[lastIndex] = {
              message: null,
              type: EventType.NONE,
            }),
          3000
        )
      );
  }

  handleDelete(code: string, index: number) {
    this.state.prompt = {
      message: 'Link will be permanently deleted. Should we proceed?',
      onPositiveBtnClicked: null,
      positiveBtnText: 'No',
      negativeBtnText: 'Yes',
      close: false,
      onNegativeBtnClicked: () => {
        const lastIndex = this.state.events.length;
        this.state.events.push({
          message: 'Deleting url',
          type: EventType.INPROGRESS,
        });
        setTimeout(() => {
          this.service
            .deleteUrl(code)
            .then((successful) => {
              if (successful) {
                this.state.events[lastIndex] = {
                  message: 'Delete successful',
                  type: EventType.SUCCESS,
                };
                console.log(index);
                this.state.urls?.splice(index, 1);
              } else {
                this.state.events[lastIndex] = {
                  message: 'Error deleting url',
                  type: EventType.ERROR,
                };
              }
            })
            .finally(() =>
              setTimeout(
                () =>
                  (this.state.events[lastIndex] = {
                    message: null,
                    type: EventType.NONE,
                  }),
                3000
              )
            );
        }, 3000);
      },
    };
  }
}
