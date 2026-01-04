import { Component } from '@angular/core';
import { ProfileTileComponent } from '../profile-tile/profile-tile.component';
import { AboutTileComponent } from '../about-tile/about-tile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileTileComponent, AboutTileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
