import {Component, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-apartment-information',
  templateUrl: './apartment-information.component.html',
  styleUrls: ['./apartment-information.component.scss']
})
export class ApartmentInformationComponent implements OnInit {

  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;

  constructor() { }

  ngOnInit() {
    const mapProperties = {
      center: new google.maps.LatLng(40.7576, -73.9979),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const marker1 = {
      lat: 40.7576, lng: -73.9979
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.marker = new google.maps.Marker({
      map: this.map,
      position: marker1,
      draggable: true,
      animation: google.maps.Animation.DROP,
      title: 'Ming Apartment'
    });
    this.marker.addListener('click', this.toggleBounce);
    // marker.setMap(this.map);
  }

  toggleBounce() {
    if (this.marker) {
      if (this.marker.getAnimation() !== null) {
        this.marker.setAnimation(null);
      } else {
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  }

}
