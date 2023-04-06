import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ResourcesComponent } from './resources/resources.component';
import { ResourceEditComponent } from './resources/resource-edit/resource-edit.component';
import { ResourceDetailComponent } from './resources/resource-detail/resource-detail.component';

import { TagsComponent } from './tags/tags.component';
import { TagEditComponent } from './tags/tag-edit/tag-edit.component';
import { TagDetailComponent } from './tags/tag-detail/tag-detail.component';
import { SearchComponent } from './search/search.component';
import { ResourceSearchDetailComponent } from './resources/resource-search-detail/resource-search-detail.component';

// import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/resources', pathMatch: 'full' },
  {
    path: 'resources', component: ResourcesComponent, children: [
      { path: 'new', component: ResourceEditComponent },
      { path: ':id', component: ResourceDetailComponent },
      { path: ':id/edit', component: ResourceEditComponent },
    ]
  },
  {
    path: 'search', component: SearchComponent, children: [
      { path: ':id', component: ResourceSearchDetailComponent },
    ]
  },
  {
    path: 'tags', component: TagsComponent, children: [
      { path: 'new', component: TagEditComponent },
      { path: ':id', component: TagDetailComponent },
      { path: ':id/edit', component: TagEditComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
