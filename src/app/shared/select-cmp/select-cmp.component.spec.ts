import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCmpComponent } from './select-cmp.component';

describe('SelectCmpComponent', () => {
  let component: SelectCmpComponent;
  let fixture: ComponentFixture<SelectCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
