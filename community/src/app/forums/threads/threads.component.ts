import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ForumsService } from '../services/forums.service';
import { Thread } from '../services/data';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {
  threads: Thread[];

  constructor(private rutaactiva: ActivatedRoute,
    private forumsService:ForumsService) { }

  ngOnInit() {
    this.rutaactiva.params.subscribe((x: Params) => {
      this.threads = this.forumsService.forum(x['forum_alias']).threads;
    })
  }
}
