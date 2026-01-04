import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-profile-tile',
  standalone: true,
  imports: [],
  templateUrl: './profile-tile.component.html',
  styleUrl: './profile-tile.component.css'
})
export class ProfileTileComponent {
  imagePath = signal('assets/profile.jpg');
  showImage = signal(true);

  onImageError() {
    this.showImage.set(false);
  }
}
