import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metric-bis',
  templateUrl: './metric-bis.component.html',
  styleUrls: ['./metric-bis.component.css']
})
export class MetricBisComponent {
  @Input() title: string;
  @Input() description: string;

  //@Input('used') value: number = 0;
  private _value: number = 0;

  @Input('used')
  set value(value: number) {
    if (isNaN(value)) value = 0;
    this._value = value;
  }

  get value(): number { return this._value; }

  //@Input('available') max: number = 100;
  private _max: number = 100;

  @Input('available')
  set max(max: number) {
    if (isNaN(max)) max = 100;
    this._max = max;
  }

  get max(): number { return this._max; }

  constructor() { }

  isDanger() {
    return this.value / this.max > 0.7;
  }

}
