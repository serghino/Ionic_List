import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { KanbanService } from 'src/app/services/kanban.service';
import { List } from 'src/app/models/list.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild(IonList) listIon: IonList;
  @Input() tabsNumber: string;
  constructor(public kanbanServices: KanbanService,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {}

  selectItem(list : List){
    this.router.navigateByUrl(`/tabs/${this.tabsNumber}/add/${list.id}`);
  }

  deleteList(list: number) {
    this.kanbanServices.deleteList(list);
  }

  async editList(list: List){
    const alert = await this.alertCtrl.create({
      header: 'Edit list',
      inputs : [
        {
          name: 'title',
          type: 'text',
          value : list.title,
          placeholder: 'Name of list'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.listIon.closeSlidingItems();
            //console.log(`cancel...`);
          }
        },
        {
          text: 'Edit',
          handler : (data) => {
            if(data.title.length === 0){
              return;
            }
            list.title = data.title;
            this.kanbanServices.saveStorage();
            this.listIon.closeSlidingItems();
          }
        }
      ]
    });
    await alert.present();
  }

}
