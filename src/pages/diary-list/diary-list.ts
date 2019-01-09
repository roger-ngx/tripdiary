import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { Items } from '../add-images/Item';
import { AddImagesPage } from '../add-images/add-images';
import { DiaryPage } from '../diary/diary';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DiaryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diary-list',
  templateUrl: 'diary-list.html',
})
export class DiaryListPage {

  items: Items[];
  area: any;
  isEditMode = false;
  itemChecked: boolean[];
  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.items = this.navParams.get('items');
    this.area = this.navParams.get('area');

    this.itemChecked = [];
    console.log(this.items);
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent) => {
        this.navCtrl.popAll();
    };
  }

  openDiary(item){
    this.navCtrl.push(DiaryPage, {
      items : item
    });
  }

  addDiaryItem(){
    this.navCtrl.push(AddImagesPage, {
      area : this.area
    });
  }

  deleteItems(){
    console.log(this.itemChecked);

    let len = this.itemChecked.length;
    if(len > 0){
      for(let i = 0; i < len ; i ++){
          if(this.itemChecked[i]){
              this.items.splice(i, 1);
              this.itemChecked.splice(i, 1);
              --i;
          }
      }

      this.storage.set(this.area.id, this.items);
      this.isEditMode = false;
    }
  }

  longPressed(object){
    this.itemChecked = [];
    this.isEditMode = !this.isEditMode;
    console.log(this.isEditMode);
  }
}
