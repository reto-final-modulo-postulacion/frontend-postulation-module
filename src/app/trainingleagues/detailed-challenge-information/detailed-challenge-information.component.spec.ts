import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedChallengeInformationComponent } from './detailed-challenge-information.component';

describe('DetailedChallengeInformationComponent', () => {
  let component: DetailedChallengeInformationComponent;
  let fixture: ComponentFixture<DetailedChallengeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedChallengeInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedChallengeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
