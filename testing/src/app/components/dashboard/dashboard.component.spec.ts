/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, Input, TemplateRef, ViewContainerRef, Component } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { CardTypeDirective } from '../../directives/card-type.directive';
import { CardHoverDirective } from '../../directives/card-hover.directive';
import { StocksService } from '../../services/stocks.service';
import { StubStocksService } from '../../services/stocks.service.stub';
import { MockSymbolsList } from '../../services/stocks.mock';

@Directive({
  selector: '[delay]'
})
class StubDelayDirective {
  @Input() set delay(ms: number) { this.viewContainer.createEmbeddedView(this.templateRef); }
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }
}

@Component({
  selector: 'summary',
  template: '<div class="mdl-card">{{stock}}</div>'
})
class StubSummaryComponent {
  @Input() stock;
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        StubSummaryComponent,
        StubDelayDirective,
        CardTypeDirective,
        CardHoverDirective,
      ],
      providers: [
        { provide: StocksService, useClass: StubStocksService }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    expect(component.stocks).toBeFalsy();
    fixture.detectChanges();
    expect(component.stocks).toBeTruthy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the template', () => {
    expect(de.query(By.css('.mdl-cell')).properties.innerHTML).not.toContain('Loading');
    expect(de.queryAll(By.directive(StubSummaryComponent)).length).toEqual(MockSymbolsList.length);
  });
});
