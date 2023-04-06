import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Resource } from './resource.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalhostService } from '../localhost.service';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  resourceListChangedEvent = new Subject<Resource[]>();
  resources: Resource[] = [];
  private maxResourceId: number;

  constructor(private http: HttpClient, private localhost: LocalhostService) {
    this.maxResourceId = this.getMaxId(this.resources);
  }

  getResources() {
    /**
     * Returns array of all resources
     */
    this.http.get<Resource[]>(this.localhost.getUrl(this.localhost.RESOURCES_TABLE)).subscribe(
      {
        next: (resources: Resource[]) => {
          this.resources = resources;
          this.sortAndSend();
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log("GET request complete.");
        }
      }
    )
  }


  sortAndSend() {
    this.resources.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    this.resourceListChangedEvent.next(this.resources.slice());
  }

  getResource(id: string): Resource | undefined {
    /**
     * Finds a single resource with given id
     * Returns null if no resource was found
     */
    return this.resources.find(resource => resource.id == id)
  }


  deleteResource(resource: Resource) {

    if (!resource) {
      return;
    }

    const pos = this.resources.findIndex(d => d.id === resource.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete(this.localhost.getUrl(this.localhost.RESOURCES_TABLE) + resource.id)
      .subscribe(
        (response) => {
          this.resources.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  getMaxId(resourceList: Resource[]): number {
    return Math.max(...resourceList.map(o => +o.id));
  }

  addResource(resource: Resource) {
    if (!resource) {
      return;
    }

    // make sure id of the new Resource is empty
    resource.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http.post<{ message: string, resource: Resource }>(this.localhost.getUrl(this.localhost.RESOURCES_TABLE),
      resource,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new resource to resources
          this.resources.push(responseData.resource);
          this.sortAndSend();
        }
      );
  }


  updateResource(originalResource: Resource | undefined, newResource: Resource | undefined) {
    if (!originalResource || !newResource) {
      return;
    }

    const pos = this.resources.findIndex(d => d.id === originalResource.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Resource to the id of the old Resource
    newResource.id = originalResource.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put(this.localhost.getUrl(this.localhost.RESOURCES_TABLE) + originalResource.id,
      newResource, { headers: headers })
      .subscribe(
        (response) => {
          this.resources[pos] = newResource;
          this.sortAndSend();
        }
      );
  }

}
