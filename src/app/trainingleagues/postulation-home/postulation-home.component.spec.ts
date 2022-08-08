import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationHomeComponent } from './postulation-home.component';

describe('PostulationHomeComponent', () => {
  let component: PostulationHomeComponent;
  let fixture: ComponentFixture<PostulationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulationHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
