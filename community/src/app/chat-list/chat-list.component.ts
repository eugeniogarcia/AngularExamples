import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumsService } from '../forums/services/forums.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  users: any[];
  talkTo: string;

  constructor(private forumsService: ForumsService,
    private enrutador:Router) { }

  ngOnInit() {
    this.users = this.forumsService.users;
  }

  close() {
    //Programaticamente navegamos a un outlet secundaria llamado chat, con la ruta null
    this.enrutador.navigate([{ outlets: { chat: null } }]);
  }
}
