import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertInfoComponent } from './expert-info.component';

describe('ExpertInfoComponent', () => {
  let component: ExpertInfoComponent;
  let fixture: ComponentFixture<ExpertInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
