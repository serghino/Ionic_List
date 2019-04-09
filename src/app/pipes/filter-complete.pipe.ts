import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/list.model';

@Pipe({
  name: 'filterComplete',
  pure: false
})
export class FilterCompletePipe implements PipeTransform {

  transform(lists: List[], complete: string): List[] {
    if (complete === 'tab2'){
      return lists.filter(data => data.done === true);
    } else {
      return lists.filter(data => data.done === false);
    }
  }

}
