import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, from } from 'rxjs';

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

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    from([target.checked])
      .pipe(debounceTime(200))
      .subscribe((v) => this.toggle.emit(v));
  }
}
