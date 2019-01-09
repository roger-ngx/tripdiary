import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaryListPage } from './diary-list';

@NgModule({
  declarations: [
    DiaryListPage,
  ],
  imports: [
    IonicPageModule.forChild(DiaryListPage),
  ],
})
export class DiaryListPageModule {}
