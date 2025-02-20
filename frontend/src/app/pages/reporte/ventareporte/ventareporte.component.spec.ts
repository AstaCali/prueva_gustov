import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentareporteComponent } from './ventareporte.component';

describe('VentareporteComponent', () => {
  let component: VentareporteComponent;
  let fixture: ComponentFixture<VentareporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentareporteComponent]
    });
    fixture = TestBed.createComponent(VentareporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
