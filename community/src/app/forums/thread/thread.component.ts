import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ForumsService } from '../services/forums.service';
import { Forum, Thread } from '../services/data';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  forum: Forum;
  thread: Thread;

  constructor(private forumsService: ForumsService,
    private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.rutaActiva.params.subscribe((params: Params) => {
      //Hace un snapshot - desactiva el streaming - y toma un parametro de la ruta padre
      let forum = this.rutaActiva.snapshot.parent.params['forum_alias'];
      this.thread = this.forumsService.thread(forum, params['thread_alias']);
    });
  }
}
