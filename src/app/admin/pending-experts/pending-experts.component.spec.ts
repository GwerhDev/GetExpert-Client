import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingExpertsComponent } from './pending-experts.component';

describe('PendingExpertsComponent', () => {
  let component: PendingExpertsComponent;
  let fixture: ComponentFixture<PendingExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingExpertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
