import { Component, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CardHoverDirective } from './card-hover.directive';

@Component({
  template: `<div cardHover class="mdl-card decrease">Content</div>`
})
class MockComponent {}

describe('CardHoverDirective', () => {
  let directive: CardHoverDirective;
  let card: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent,
      ]
    });
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(MockComponent);
    card = fixture.debugElement.query(By.css('[cardHover]')).nativeElement;
    directive = new CardHoverDirective(new ElementRef(fixture.debugElement.nativeElement));
    directive.ngOnInit();
  });

  it('should apply the correct background colors', () => {
    expect(card.style.backgroundColor.replace(/ /g, '')).toContain('rgb(255,171,64)');
    card.classList.remove('decrease');
    card.classList.add('increase');
    directive.ngOnInit();
    expect(card.style.backgroundColor.replace(/ /g, '')).toContain('rgb(63,81,181)');
    card.classList.remove('increase');
    directive.ngOnInit();
    expect(card.style.backgroundColor).toEqual('');
  });

  it('should apply hover styling', () => {
    directive.onMouseOver();
    expect(card.style.top).toEqual('-2px');
    directive.onMouseOut();
    expect(card.style.top).toEqual('');
  });
});
