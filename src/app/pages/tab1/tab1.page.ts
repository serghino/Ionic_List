import { Component, ViewChild } from '@angular/core';
import { KanbanService } from 'src/app/services/kanban.service';
import { Router } from '@angular/router';
import { AlertController, IonFab } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonFab) iconfab: IonFab;
  tab = "tab1";
  
  constructor(public kanbanServices: KanbanService,
              private router: Router,
              private alertCtrl: AlertController) {}
  async addList(){
      const alert = await this.alertCtrl.create({
        header: 'New list',
        inputs : [
          {
            name: 'title',
            type: 'text',
            placeholder: 'Name of list'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.iconfab.close();
              //console.log(`cancel...`);
            }
          },
          {
            text: 'Create',
            handler : (data) => {
              if(data.title.length === 0){
                this.iconfab.close();
                return;
              }
              const listId = this.kanbanServices.createList(data.title);
              this.router.navigateByUrl(`/tabs/tab1/add/${listId}`);
              this.iconfab.close();
            }
          }
        ]
      });
      await alert.present();
  }
}
