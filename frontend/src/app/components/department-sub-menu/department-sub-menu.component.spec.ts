import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSubMenuComponent } from './department-sub-menu.component';

describe('DepartmentSubMenuComponent', () => {
  let component: DepartmentSubMenuComponent;
  let fixture: ComponentFixture<DepartmentSubMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentSubMenuComponent]
    });
    fixture = TestBed.createComponent(DepartmentSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
