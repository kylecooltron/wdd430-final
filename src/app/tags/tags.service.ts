import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tag } from './tag.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalhostService } from '../localhost.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  tagListChangedEvent = new Subject<Tag[]>();
  tags: Tag[] = [];
  private maxTagId: number;

  constructor(private http: HttpClient, private localhost: LocalhostService) {
    this.maxTagId = this.getMaxId(this.tags);
  }

  getTags() {
    /**
     * Returns array of all tags
     */
    this.http.get<Tag[]>(this.localhost.getUrl(this.localhost.TAGS_TABLE)).subscribe(
      {
        next: (tags: Tag[]) => {
          this.tags = tags;
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
    this.tags.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    this.tagListChangedEvent.next(this.tags.slice());
  }

  getTag(id: string): Tag | undefined {
    /**
     * Finds a single tag with given id
     * Returns null if no tag was found
     */
    return this.tags.find(tag => tag.id == id)
  }


  deleteTag(tag: Tag) {

    if (!tag) {
      return;
    }

    const pos = this.tags.findIndex(d => d.id === tag.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete(this.localhost.getUrl(this.localhost.TAGS_TABLE) + tag.id)
      .subscribe(
        (response) => {
          this.tags.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  getMaxId(tagList: Tag[]): number {
    return Math.max(...tagList.map(o => +o.id));
  }

  addTag(tag: Tag) {
    if (!tag) {
      return;
    }

    // make sure id of the new Tag is empty
    tag.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http.post<{ message: string, tag: Tag }>(this.localhost.getUrl(this.localhost.TAGS_TABLE),
      tag,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new tag to tags
          this.tags.push(responseData.tag);
          this.sortAndSend();
        }
      );
  }


  updateTag(originalTag: Tag | undefined, newTag: Tag | undefined) {
    if (!originalTag || !newTag) {
      return;
    }

    const pos = this.tags.findIndex(d => d.id === originalTag.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Tag to the id of the old Tag
    newTag.id = originalTag.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put(this.localhost.getUrl(this.localhost.TAGS_TABLE) + originalTag.id,
      newTag, { headers: headers })
      .subscribe(
        (response) => {
          this.tags[pos] = newTag;
          this.sortAndSend();
        }
      );
  }

}
