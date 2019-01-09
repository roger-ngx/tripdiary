import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { Item, Items } from "../add-images/Item"
import { SocialSharing } from '@ionic-native/social-sharing';
import { Toast } from '@ionic-native/toast';
import { Storage } from '@ionic/storage';
import { DiaryListPage } from '../diary-list/diary-list';
/**
 * Generated class for the DiaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html',
})
export class DiaryPage {

  isPreview;
  items: Items;
  msg: string;
  itemList:any;
  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, 
    private toast: Toast, private storage: Storage) {

      this.items = navParams.get('items');
      this.isPreview = navParams.get('preview');

      console.log('Diary Page');
      console.log(this.items);

      this.itemList = this.items.items;
      console.log(this.itemList);
  }

  ionViewDidLoad() {
    // this.navBar.backButtonClick = (e:UIEvent)=>{
    //   // todo something
    //   this.navCtrl.popAll();
    // }
  }

  saveYourDiary(){
    var temp = this;
    
    this.storage.get(this.items.id).then((val) => {
        val = val || [];

        val.push(this.items);
          
        temp.storage.set(this.items.id, val);

        this.navCtrl.push(DiaryListPage, {
          items : val
        });
    });
    
    this.storage.get('area_list').then((val) => {

        val = val || [];

        let len = val.length;
        let i;
        for(i = 0; i < len; i++){
          if(val[i] === this.items.id){
            return;
          }
        }

        val.push(this.items.id);
          
        temp.storage.set('area_list', val);

        //this.navCtrl.popToRoot(); 

        this.navCtrl.push(DiaryListPage, {
            items : val
        });
    });
    
  }

  facebookShare(){

     this.socialSharing.shareViaFacebook('From an amazing app', 'From an amazing app', 'https://cdn-images-1.medium.com/max/1600/1*fgIscKDrMbZTzIz92ijA_w.png')
     .then((result) => {
          this.toast.show(result, '5000', 'center').subscribe(
            toast => {
              
            }
          );
      }).catch((error) => {
          this.toast.show(error, '5000', 'center').subscribe(
            toast => {
              
            }
          );
      });
  }

}
