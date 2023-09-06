import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertPersonalInfoComponent } from './expert-personal-info.component';

describe('ExpertPersonalInfoComponent', () => {
  let component: ExpertPersonalInfoComponent;
  let fixture: ComponentFixture<ExpertPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertPersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
