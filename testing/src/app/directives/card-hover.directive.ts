import { Directive, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[cardHover]'
})
export class CardHoverDirective implements OnInit {
  card: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.card = this.el.nativeElement.querySelector('.mdl-card');

    if (this.card.classList.contains('increase')) {
      this.card.style.backgroundColor = 'rgb(63,81,181)';
    } else if (this.card.classList.contains('decrease')) {
      this.card.style.backgroundColor = 'rgb(255,171,64)';
    } else {
      this.card.style.backgroundColor = '';
    }
  }

  @HostListener('mouseover') onMouseOver() {
    this.card.style.boxShadow = '2px 2px 1px #999';
    this.card.style.top = '-2px';
  }

  @HostListener('mouseout') onMouseOut() {
    this.card.style.boxShadow = '';
    this.card.style.top = '';
  }
}
