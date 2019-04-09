import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  lists: List [] = [];
  constructor() {
    this.loadStorage();
   }

   createList(title: string) {
     const newList = new List(title);
     this.lists.push(newList);
     this.saveStorage();

     return newList.id;
   }

   deleteList(idlist: number){
     this.lists = this.lists.filter( listData => listData.id !== idlist);
     this.saveStorage();
   }

   getList(id: string | number) {
    id = Number(id);
    //Find Item of list.
    return this.lists.find(listdata => listdata.id === id);
   }

   saveStorage(){
    localStorage.setItem('data', JSON.stringify(this.lists));
   }

   loadStorage(){
    //validate NULL
     if(localStorage.getItem('data')){
         this.lists = JSON.parse(localStorage.getItem('data'));
     }
   }
}
