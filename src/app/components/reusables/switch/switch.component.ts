import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
})
export class SwitchComponent implements OnInit {
  @Input() checked: boolean = false;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
