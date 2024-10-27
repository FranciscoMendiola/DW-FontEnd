import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavService } from '../../_service/nav.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentUrl?: string;

  constructor(private navService: NavService){}

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => { this.currentUrl = url;});
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => { this.currentUrl = url});
  }
}
