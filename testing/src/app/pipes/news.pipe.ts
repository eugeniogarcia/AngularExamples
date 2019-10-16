import { Pipe, PipeTransform } from '@angular/core';
import { StocksService } from '../services/stocks.service';

@Pipe({
  name: 'news',
  pure: false
})
export class NewsPipe implements PipeTransform {
  cachedSource: string = '';
  news: string = 'loading...';

  constructor(private service: StocksService) {}

  transform(source: string, args?: any): any {
    if (source !== this.cachedSource) {
      this.cachedSource = source;

      this.service.getNewsSnapshot(source).subscribe(news => {
        this.news = `<a href="${news.url}" target="_blank">${news.title}</a>`;
      });
    }

    return this.news;
  }
}
