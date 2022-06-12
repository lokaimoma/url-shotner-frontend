import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNotifierComponent } from './event-notifier.component';

describe('EventNotifierComponent', () => {
  let component: EventNotifierComponent;
  let fixture: ComponentFixture<EventNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventNotifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
