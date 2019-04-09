import { Component } from '@angular/core';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tab = "tab2";
  constructor(public kanbanServices: KanbanService){
    
  }
}
