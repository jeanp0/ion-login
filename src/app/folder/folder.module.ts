import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FolderComponentRoutingModule } from './folder-routing.module';
import { FolderComponent } from './folder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderComponentRoutingModule,
  ],
  declarations: [FolderComponent],
})
export class FolderPageModule {}
