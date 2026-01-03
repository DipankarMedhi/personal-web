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
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding: 0 1rem;
    }

    /* Responsive grid: 2 columns on larger screens */
    @media (min-width: 900px) {
        .grid-container {
            grid-template-columns: 1.2fr 1.8fr; /* Profile takes less width than about */
            align-items: stretch;
            gap: 2.5rem;
        }
    }

    .tile {
        height: 100%;
    }
  `]
})
export class HomeComponent {

}
