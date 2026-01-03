import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="logo">
        <a routerLink="/">DM</a>
      </div>
      <div class="nav-links">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
        <a routerLink="/daily-bytes" routerLinkActive="active">Daily New Bytes</a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 3rem;
      background: rgba(10, 10, 10, 0.7);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 1000;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      width: 100%;
    }

    .logo a {
      font-size: 1.8rem;
      font-weight: 700;
      color: #fff;
      text-decoration: none;
      letter-spacing: -1px;
    }

    .nav-links {
      display: flex;
      gap: 3rem;
    }

    .nav-links a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      position: relative;
      font-size: 0.95rem;
      letter-spacing: 0.5px;
    }

    .nav-links a:hover {
      color: #fff;
    }

    .nav-links a.active {
      color: #fff;
    }

    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: var(--neon-green);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--neon-green);
    }
  `]
})
export class HeaderComponent {

}
