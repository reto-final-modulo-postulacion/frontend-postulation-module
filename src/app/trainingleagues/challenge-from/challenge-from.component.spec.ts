import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeFromComponent } from './challenge-from.component';

describe('ChallengeFromComponent', () => {
  let component: ChallengeFromComponent;
  let fixture: ComponentFixture<ChallengeFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
