import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllManagerRoutesComponent } from './all-manager-routes.component';

describe('AllManagerRoutesComponent', () => {
  let component: AllManagerRoutesComponent;
  let fixture: ComponentFixture<AllManagerRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllManagerRoutesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllManagerRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
