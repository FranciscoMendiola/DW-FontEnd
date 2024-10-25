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
}
