import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageComponentComponent } from './manage-component.component';

describe('ManageComponentComponent', () => {
  let component: ManageComponentComponent;
  let fixture: ComponentFixture<ManageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
