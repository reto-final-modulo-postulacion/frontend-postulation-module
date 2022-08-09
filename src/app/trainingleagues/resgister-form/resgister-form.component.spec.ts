import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgisterFormComponent } from './resgister-form.component';

describe('ResgisterFormComponent', () => {
  let component: ResgisterFormComponent;
  let fixture: ComponentFixture<ResgisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResgisterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResgisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
