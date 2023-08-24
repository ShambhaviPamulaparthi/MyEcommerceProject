import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowersListComponent } from './flowers-list.component';

describe('FlowersListComponent', () => {
  let component: FlowersListComponent;
  let fixture: ComponentFixture<FlowersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowersListComponent]
    });
    fixture = TestBed.createComponent(FlowersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
