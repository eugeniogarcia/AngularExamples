import { Component } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, async, tick } from '@angular/core/testing';
import { DelayDirective } from './delay.directive';

@Component({
  template: `<div *delay="delay"><h1>DELAYED</h1></div>`
})
class MockComponent {
  delay = 10;
}

describe('DelayDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent,
        DelayDirective
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    el = fixture.debugElement.nativeElement;
  });

  it('should show after the specified delay using fakeAsync', fakeAsync(() => {
    expect(el.innerHTML).not.toContain('DELAYED');
    fixture.detectChanges();
    tick(10);
    expect(el.innerHTML).toContain('DELAYED');
  }));

  it('should show after the specified delay using async', async(() => {
    expect(el.innerHTML).not.toContain('DELAYED');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.innerHTML).toContain('DELAYED');
    });
  }));
});
