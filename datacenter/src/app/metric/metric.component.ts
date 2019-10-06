//ChangeDetectionStrategy nos permitira especificar la estrategia de change detection. Sino especificamos una utiliza Default. Default hace el checkeo en todos los children del componente que cambia, tengan o no tengan definida la propiedad cambiada como uno de sus inputs
//OnChange es una estrategia que propaga los cambios solo a aquellos Children que tengan en sus inputs la propiedad cambiada
//OnChanges nos permite crear un hoock en el life cycle de la gestion de cambios
import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: "app-metric",
  templateUrl: "./metric.component.html",
  styleUrls: ["./metric.component.css"],
  //Especificamos como politica de propagacion de cambios OnPush
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricComponent implements OnChanges {
  @Input() title: string;
  @Input() description: string;

  @Input("used") value: number = 0;
  @Input("available") max: number = 100;

  constructor() {}

  isDanger() {
    return this.value / this.max > 0.7;
  }

  //La validacion que haces haciamos en el getter la hacemos ahora en el hook
  ngOnChanges(changes): void {
    if (changes.value && isNaN(changes.value.currentValue)) this.value=0;
    if (changes.max && isNaN(changes.max.currentValue)) this.max = 0;
  }
}
