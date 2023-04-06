import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from './tag.model';

@Pipe({
  name: 'tagsFilter',
  pure: false
})
export class TagsFilterPipe implements PipeTransform {

  transform(tags: Tag[], term: string, already_tags: Tag[]): any {
    let filteredTags: Tag[] = [];
    if (term && already_tags && term.length > 0) {
      filteredTags = tags.filter(
        (tag: Tag) => (tag.name.toLowerCase().includes(term.toLowerCase()) && !already_tags.some(el => el.id === tag.id))
      );
    }
    return filteredTags.slice(0, 8);
  }

}
