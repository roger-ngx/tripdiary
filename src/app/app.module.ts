import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddImagesPage } from '../pages/add-images/add-images';
import { DiaryPage } from '../pages/diary/diary'

import { AmChartsModule } from "@amcharts/amcharts3-angular";

// import { File } from '@ionic-native/file';
// import { FileTransfer } from '@ionic-native/file-transfer';
// import { FilePath } from '@ionic-native/file-path';
// import { Camera } from '@ionic-native/camera';

import { ImagePicker } from '@ionic-native/image-picker';
import { Toast } from '@ionic-native/toast';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { DiaryListPage } from '../pages/diary-list/diary-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddImagesPage,
    DiaryPage,
    DiaryListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AmChartsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddImagesPage,
    DiaryPage,
    DiaryListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocialSharing,
    ImagePicker,
    Toast
  ]
})
export class AppModule {}
