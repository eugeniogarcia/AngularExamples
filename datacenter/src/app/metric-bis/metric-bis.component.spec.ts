import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricBisComponent } from './metric-bis.component';

describe('MetricBisComponent', () => {
  let component: MetricBisComponent;
  let fixture: ComponentFixture<MetricBisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricBisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricBisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
