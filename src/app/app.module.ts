import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header.component';

import { ResourcesComponent } from './resources/resources.component';
import { ResourceListComponent } from './resources/resource-list/resource-list.component';
import { ResourceDetailComponent } from './resources/resource-detail/resource-detail.component';
import { ResourceItemComponent } from './resources/resource-item/resource-item.component';
import { ResourcesFilterPipe } from './resources/resources-filter.pipe';
import { ResourceEditComponent } from './resources/resource-edit/resource-edit.component';

import { TagsComponent } from './tags/tags.component';
import { TagListComponent } from './tags/tag-list/tag-list.component';
import { TagDetailComponent } from './tags/tag-detail/tag-detail.component';
import { TagItemComponent } from './tags/tag-item/tag-item.component';
import { TagEditComponent } from './tags/tag-edit/tag-edit.component';


import { DropdownDirective } from './shared/dropdown.directive';
import { DndModule } from 'ng2-dnd';
import { HttpClientModule } from '@angular/common/http';
import { SearchListComponent } from './search/search-list/search-list.component';
import { SearchComponent } from './search/search.component';
import { TagsFilterPipe } from './tags/tags-filter.pipe';
import { TagSearchItemComponent } from './tags/tag-search-item/tag-search-item.component';
import { ResourceSearchDetailComponent } from './resources/resource-search-detail/resource-search-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    ResourcesComponent,
    ResourceListComponent,
    ResourceDetailComponent,
    ResourceSearchDetailComponent,
    ResourceItemComponent,
    ResourceEditComponent,
    ResourcesFilterPipe,
    TagsFilterPipe,
    TagsComponent,
    TagListComponent,
    TagDetailComponent,
    TagItemComponent,
    TagSearchItemComponent,
    TagEditComponent,
    SearchListComponent,
    SearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    DndModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
