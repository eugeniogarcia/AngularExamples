import { Component, OnInit } from '@angular/core';
import { ForumsService } from '../services/forums.service';
import { Forum } from '../services/data';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  forum: Forum;

  constructor(
    //Servicio que nos permite inspeccionar la ruta activa
    private route: ActivatedRoute,
    //Serivio que gestiona rutas
    private router: Router,
    private forumsService: ForumsService) { }

  ngOnInit() {
    //Se subscribe a la lista de parametros de la ruta actual
    this.route.params.subscribe((params: Params) => {
      //Obtiene el parametro forum_alias...
      this.forum = this.forumsService.forum(params['forum_alias']);
      //... pero si no lo encuentra, navega hasta el componente not-found
      if (!this.forum) this.router.navigate(['/not-found']);
    });
  }

}
