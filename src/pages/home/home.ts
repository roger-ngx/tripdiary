import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AmChartsService, AmChart} from "@amcharts/amcharts3-angular";
import { AddImagesPage } from '../add-images/add-images';
import { Storage } from '@ionic/storage';
import { DiaryListPage } from '../diary-list/diary-list';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private chart: AmChart;
  private area: any;

  constructor(public navCtrl: NavController, private AmCharts:AmChartsService, private storage: Storage) {
  }

  ionViewWillEnter(){
    this.createChart();
  }

  loadAreas(){

    this.storage.get('area_list').then((val) => {
        if(val != null){

            val = val || [];
    
            let length = val.length;
    
            for(let i = 0; i < length; i++){
                // update US color in data
                let area = this.chart.getObjectById(val[i]);

                if(area != null){

                  area.color = '#54B64C';
                  area.colorReal = area.color;
    
                  // make the chart take in new color
                  area.validate();
                }
            }
        }
    });
  }

  ngOnDestroy() {
    //if (this.chart) {
      //this.AmCharts.destroyChart(this.chart);
    //}
  }

  itemTapped() {

    this.storage.get(this.area.id).then((val) => {
        if(val == null){

          this.navCtrl.push(AddImagesPage, {
            area : this.area
          });

        }else{

          this.navCtrl.push(DiaryListPage, {
            area : this.area,
            items : val
          });

        }
    });
  }

  private createChart(){
    this.chart = this.AmCharts.makeChart( "chartdiv", {
        "type": "map",
        "theme": "light",

        "panEventsEnabled": true,
        //"backgroundColor": "#666666",
        //"backgroundAlpha": 1,
        "dataProvider": {
          "map": "vietnamLow",
          "getAreasFromMap": true
        },
        "areasSettings": {
          "autoZoom": false,
          "color": "#CDCDCD",
          "colorSolid": "#5EB7DE",
          "selectedColor": "#5EB7DE",
          "outlineColor": "#666666",
          "rollOverColor": "#88CAE7",
          "rollOverOutlineColor": "#FFFFFF",
          "selectable": true
        },
        "export": {
          "enabled": false
        },
        "listeners": [{
          "event": "rendered",
          "method": () => this.loadAreas()
          }],
      } 
    );

    this.AmCharts.updateChart(this.chart, () => {
      // Change whatever properties you want, add event listeners, etc.
      this.chart.addListener("clickMapObject", (event) => {
        console.log(event.mapObject);
        // toggle showAsSelected
        for ( var i in this.chart.dataProvider.areas ) {
          this.chart.dataProvider.areas[ i ].isFirst = false;
        }
        event.mapObject.isFirst = true;
        //event.mapObject.showAsSelected = !event.mapObject.showAsSelected;

        // bring it to an appropriate color
        //this.chart.returnInitialColor( event.mapObject );
        this.area = {id: event.mapObject.id, name: event.mapObject.enTitle};
      });
    });
  }

}
