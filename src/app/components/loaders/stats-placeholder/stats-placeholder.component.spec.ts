import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPlaceholderComponent } from './stats-placeholder.component';

describe('StatsPlaceholderComponent', () => {
  let component: StatsPlaceholderComponent;
  let fixture: ComponentFixture<StatsPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
