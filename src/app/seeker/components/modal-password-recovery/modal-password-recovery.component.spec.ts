import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPasswordRecoveryComponent } from './modal-password-recovery.component';

describe('ModalLoginUserComponent', () => {
  let component: ModalPasswordRecoveryComponent;
  let fixture: ComponentFixture<ModalPasswordRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPasswordRecoveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPasswordRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
