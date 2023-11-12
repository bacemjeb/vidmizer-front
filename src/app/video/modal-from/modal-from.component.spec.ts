import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFromComponent } from './modal-from.component';

describe('ModalFromComponent', () => {
  let component: ModalFromComponent;
  let fixture: ComponentFixture<ModalFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
