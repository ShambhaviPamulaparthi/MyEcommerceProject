import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerDetailsComponent } from './flower-details.component';

describe('FlowerDetailsComponent', () => {
  let component: FlowerDetailsComponent;
  let fixture: ComponentFixture<FlowerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowerDetailsComponent]
    });
    fixture = TestBed.createComponent(FlowerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
