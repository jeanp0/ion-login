import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderComponent } from './folder.component';

const routes: Routes = [
  {
    path: '',
    component: FolderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderComponentRoutingModule {}
