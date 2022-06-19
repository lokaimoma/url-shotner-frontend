import { Component, Input, OnInit } from '@angular/core';

export type PromptData = {
  message: string;
  positiveBtnText: string | null;
  negativeBtnText: string | null;
  close: boolean;
  onNegativeBtnClicked: null | (() => void);
  onPositiveBtnClicked: null | (() => void);
};

@Component({
  selector: 'linksly-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css'],
})
export class PromptComponent implements OnInit {
  @Input() prompt: PromptData | null = null;

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
    if (this.prompt?.close === false) {
      this.prompt.close = true;
    }
    setTimeout(() => (this.prompt = null), 250);
  }
}
