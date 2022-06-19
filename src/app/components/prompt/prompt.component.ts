import { Component, Input, OnInit } from '@angular/core';

export type PromptData = {
  message: string;
  positiveBtnText: string | null;
  negativeBtnText: string | null;
  onNegativeBtnClicked: null | (() => void);
  onPositiveBtnClicked: null | (() => void);
};

@Component({
  selector: 'linksly-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css'],
})
export class PromptComponent implements OnInit {
  @Input() prompt: PromptData | null = {
    message: 'hello',
    positiveBtnText: 'ok',
    negativeBtnText: 'cancel',
    onNegativeBtnClicked: null,
    onPositiveBtnClicked: () => {
      while (true) {
        for (let i = 0; i < 10; i++) {
          if (i === 5) break;
          console.log(i);
          setTimeout(() => {}, 3000);
        }
        break;
      }
    },
  };
  close: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ok() {
    const tmp = this.prompt;
    new Promise((__, _) => {
      this.closePrompt();
    }).then();
    if (tmp?.onPositiveBtnClicked) {
      tmp.onPositiveBtnClicked();
    }
  }

  cancel() {
    const tmp = this.prompt;
    new Promise((__, _) => {
      this.closePrompt();
    }).then();
    if (tmp?.onNegativeBtnClicked) {
      tmp.onNegativeBtnClicked();
    }
  }

  closePrompt() {
    this.close = true;
    setTimeout(() => (this.prompt = null), 500);
  }
}
