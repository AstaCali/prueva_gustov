import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentamenuComponent } from './ventamenu.component';

describe('VentamenuComponent', () => {
  let component: VentamenuComponent;
  let fixture: ComponentFixture<VentamenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentamenuComponent]
    });
    fixture = TestBed.createComponent(VentamenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
