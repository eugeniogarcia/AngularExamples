import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CardTypeDirective } from './card-type.directive';

@Component({
  template: `<div [cardType]="value">Content</div>`
})
class MockComponent {
  value = 0;
}
@Component({
  template: `<div [cardType]="value">Content</div>`
})
class MockPositiveComponent {
  value = 1;
}
@Component({
  template: `<div [cardType]="value">Content</div>`
})
class MockNegativeComponent {
  value = -1;
}

describe('CardTypeDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent,
        MockPositiveComponent,
        MockNegativeComponent,
        CardTypeDirective
      ]
    });
  });

  it('should apply no class when no change', () => {
    fixture = TestBed.createComponent(MockComponent);
    el = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(el.innerHTML).not.toContain('increase');
    expect(el.innerHTML).not.toContain('decrease');
  });

  it('should apply the increase class when positive', () => {
    fixture = TestBed.createComponent(MockPositiveComponent);
    el = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    expect(el.innerHTML).toContain('increase');
    expect(el.innerHTML).not.toContain('decrease');
  });

  it('should apply the decrease class when negative', () => {
    fixture = TestBed.createComponent(MockNegativeComponent);
    el = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    expect(el.innerHTML).not.toContain('increase');
    expect(el.innerHTML).toContain('decrease');
  });
});
