import { Component, OnInit } from '@angular/core';
import { KanbanService } from 'src/app/services/kanban.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { ListItem } from 'src/app/models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

   listPage: List;
   nameItem = '';
  constructor(private  kanbanServices: KanbanService,
              private router: ActivatedRoute) {
      const listId = this.router.snapshot.paramMap.get('listId');
      this.listPage = this.kanbanServices.getList(listId);
  }

  ngOnInit() {
  }

  addItem() {
    if(this.nameItem.length === 0) {
      return;
    }
    const newItem = new ListItem(this.nameItem);
    this.listPage.items.push(newItem);

    this.nameItem = '';
    this.kanbanServices.saveStorage();
  }

  changecheck() {
    const pending = this.listPage.items.filter(itemData => !itemData.done).length;
    if(pending === 0){
      this.listPage.doneAt = new Date();
      this.listPage.done = true;
    }
    else{
      this.listPage.doneAt = null;
      this.listPage.done = false;
    }
    this.kanbanServices.saveStorage();
  }

  deleteItem(i : number){
    this.listPage.items.splice(i, 1);
    this.kanbanServices.saveStorage();
  }

}
