import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  show = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  toggleCollapse() {
    this.show = !this.show;
  }

}
