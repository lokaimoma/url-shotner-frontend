import { Component, Input, OnInit } from '@angular/core';

export enum EventType {
  SUCCESS = 'success',
  WARNING = 'warning',
  INPROGRESS = 'inprogress',
  INFO = 'info',
  ERROR = 'error',
}

export type Event = {
  message: string;
  type: EventType;
};

@Component({
  selector: 'linksly-event-notifier',
  templateUrl: './event-notifier.component.html',
  styleUrls: ['./event-notifier.component.css'],
})
export class EventNotifierComponent implements OnInit {
  @Input() events: Event[] = [];

  constructor() {}

  ngOnInit(): void {}
}
