import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalhostService {
  baseUrl: string = "http://127.0.0.1:3000/";
  RESOURCES_TABLE = "resources/"
  TAGS_TABLE = "tags/"
  AUTH_ROUTE = "auth/"

  getUrl(database: string): string {
    return this.baseUrl + database;
  }
}
