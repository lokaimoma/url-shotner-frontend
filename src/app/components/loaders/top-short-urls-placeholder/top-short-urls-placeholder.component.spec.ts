import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopShortUrlsPlaceholderComponent } from './top-short-urls-placeholder.component';

describe('TopShortUrlsPlaceholderComponent', () => {
  let component: TopShortUrlsPlaceholderComponent;
  let fixture: ComponentFixture<TopShortUrlsPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopShortUrlsPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopShortUrlsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
