import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSentComponent } from './contact-sent.component';

describe('ContactSentComponent', () => {
  let component: ContactSentComponent;
  let fixture: ComponentFixture<ContactSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactSentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
