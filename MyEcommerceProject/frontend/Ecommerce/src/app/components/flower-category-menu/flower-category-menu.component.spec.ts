import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerCategoryMenuComponent } from './flower-category-menu.component';

describe('FlowerCategoryMenuComponent', () => {
  let component: FlowerCategoryMenuComponent;
  let fixture: ComponentFixture<FlowerCategoryMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowerCategoryMenuComponent]
    });
    fixture = TestBed.createComponent(FlowerCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
