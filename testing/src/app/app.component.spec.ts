import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { ChangeDetectorPipe } from './pipes/change-detector.pipe';
import { NewsPipe } from './pipes/news.pipe';
import { StocksService } from './services/stocks.service';
import { StubStocksService } from './services/stocks.service.stub';
import { MockNewsResponse } from './services/stocks.mock';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
      ],
      declarations: [
        AppComponent,
        ChangeDetectorPipe,
        NewsPipe,
      ],
      providers: [
        { provide: StocksService, useClass: StubStocksService },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    el = fixture.debugElement.nativeElement;
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('should load the news', () => {
    expect(el.innerHTML).toContain(MockNewsResponse.title);
  });
});
