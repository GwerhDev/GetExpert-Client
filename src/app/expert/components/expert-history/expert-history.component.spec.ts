import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertHistoryComponent } from './expert-history.component';

describe('ExpertHistoryComponent', () => {
  let component: ExpertHistoryComponent;
  let fixture: ComponentFixture<ExpertHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
