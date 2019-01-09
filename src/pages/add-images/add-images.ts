import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//https://ionicframework.com/docs/native/image-picker/
import { ImagePicker } from '@ionic-native/image-picker';
import { DiaryPage } from '../diary/diary'

import { Toast } from '@ionic-native/toast';

import { Item, Items } from './Item'

// import { File } from '@ionic-native/file';
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
// import { FilePath } from '@ionic-native/file-path';
// import { Camera, CameraOptions} from '@ionic-native/camera';
/**
 * Generated class for the AddImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-images',
  templateUrl: 'add-images.html',
})
export class AddImagesPage implements OnInit{

  items = [];

  images = [];

  private area: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private imagePicker: ImagePicker, private toast: Toast) {
      this.area = navParams.get('area');
      console.log(this.area);
      let _items = navParams.get('items');
      if(_items != null){
          this.items = [..._items];
      }
  }

  ngOnInit() {
    
    /*
      options = {
          // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
          // selection of a single image, the plugin will return it.
          maximumImagesCount: int,
          
          // max width and height to allow the images to be.  Will keep aspect
          // ratio no matter what.  So if both are 800, the returned image
          // will be at most 800 pixels wide and 800 pixels tall.  If the width is
          // 800 and height 0 the image will be 800 pixels wide if the source
          // is at least that wide.
          width: int,
          height: int,
          
          // quality of resized image, defaults to 100
          quality: int (0-100),

          // output type, defaults to FILE_URIs.
          // available options are 
          // window.imagePicker.OutputType.FILE_URI (0) or 
          // window.imagePicker.OutputType.BASE64_STRING (1)
          outputType: int
      };
    */
    if(this.items.length == 0){
        this.selectPhotos();
    }
  }

  private selectPhotos(){
    let options = {
      maximumImagesCount: 10,
    };

    this.imagePicker.getPictures(options).then((results) => {

      for (var i = 0; i < results.length; i++) {
        this.items.unshift(new Item(results[i], ""));
      }

    }, (err) => { });
  }

  reorderItems(indexes) {
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
  }

  addMoreImage(){
    //this.items.unshift(new Item("", ""));
    this.selectPhotos();
  }

  saveDiary(){
    
    this.navCtrl.push(DiaryPage, {
      items : new Items(this.area.id, this.area.name, this.items),
      preview: true
    });
  }

}
