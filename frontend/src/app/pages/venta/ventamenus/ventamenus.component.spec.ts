import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentamenusComponent } from './ventamenus.component';

describe('VentamenusComponent', () => {
  let component: VentamenusComponent;
  let fixture: ComponentFixture<VentamenusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentamenusComponent]
    });
    fixture = TestBed.createComponent(VentamenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
