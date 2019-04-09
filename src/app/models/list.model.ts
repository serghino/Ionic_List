import { ListItem } from './list-item.model';

export class List{
    id: number;
    title: string;
    created: Date;
    doneAt: Date;
    done: boolean;
    items : ListItem[];

    constructor(title: string){
        this.title = title;
        this.created = new Date();
        this.done = false;
        this.items = [];
        //generate unique number.
        this.id = new Date().getTime();
    }
}