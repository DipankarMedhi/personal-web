import { Component } from '@angular/core';
import { ProfileTileComponent } from '../profile-tile/profile-tile.component';
import { AboutTileComponent } from '../about-tile/about-tile.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ProfileTileComponent, AboutTileComponent],
    template: `
    <div class="grid-container">
      <div class="tile profile-tile">
        <app-profile-tile></app-profile-tile>
      </div>
      
      <div class="tile about-tile">
        <app-about-tile></app-about-tile>
      </div>
    </div>
  `,
    styles: [`
    /* Grid layout for tiles */
    .grid-container {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        margin-bottom: 3rem;
    }

    /* Responsive grid: 2 columns on larger screens */
    @media (min-width: 768px) {
        .grid-container {
            grid-template-columns: 1fr 1fr;
            align-items: stretch;
        }
    }

    .tile {
        height: 100%;
    }
  `]
})
export class HomeComponent {

}
