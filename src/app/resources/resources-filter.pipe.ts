import { Pipe, PipeTransform } from '@angular/core';
import { Resource } from './resource.model';

@Pipe({
  name: 'resourcesFilter'
})
export class ResourcesFilterPipe implements PipeTransform {

  transform(resources: Resource[], term: string): any {
    let filteredResources: Resource[] = [];
    if (term && term.length > 0) {
      filteredResources = resources.filter(
        (resource: Resource) => resource.name.toLowerCase().includes(term.toLowerCase()) || resource.tags?.some(tag => tag.name.toLowerCase().includes(term.toLowerCase()))
      );
    }
    return filteredResources.length ? filteredResources : resources;
  }

}
