import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentadetalleComponent } from './ventadetalle.component';

describe('VentadetalleComponent', () => {
  let component: VentadetalleComponent;
  let fixture: ComponentFixture<VentadetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentadetalleComponent]
    });
    fixture = TestBed.createComponent(VentadetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
