import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertDropdownComponent } from './expert-dropdown.component';

describe('DropdownComponent', () => {
  let component: ExpertDropdownComponent;
  let fixture: ComponentFixture<ExpertDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
