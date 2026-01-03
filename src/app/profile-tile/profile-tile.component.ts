import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-tile',
  standalone: true,
  imports: [],
  template: `
    <div class="profile-card fade-in">
      <div class="photo-container">
        <!-- Placeholder with glowing effect -->
        <div class="photo-placeholder">
          <span>DM</span>
        </div>
      </div>
      
      <div class="info">
        <h1>Dipankar Medhi</h1>
        <div class="role-pill">Software Engineer</div>
        <p class="headline">Building things for the web | Tennis Player | Coding Enthusiast</p>
        
        <div class="actions">
          <a href="https://www.linkedin.com/in/dipankar-medhi" target="_blank" class="btn primary">
            <span class="icon">in</span> LinkedIn
          </a>
          <a href="Dipankar_Resume.pdf" download="Dipankar_Medhi_Resume.pdf" class="btn secondary">
            Resume
          </a>
        </div>
      </div>
    </div>
  `,
  styles: `
    .profile-card {
      background: var(--card-light-bg);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 3rem;
      border-radius: var(--card-radius);
      text-align: center;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .profile-card::before {
      display: none;
    }
    
    .profile-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }

    .photo-container {
      margin-bottom: 2rem;
      position: relative;
    }

    .photo-placeholder {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: #1a1a1a;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3rem;
      font-weight: 800;
      color: var(--neon-green);
      border: 2px solid var(--neon-green);
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 2;
    }

    .role-pill {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: #f0f0f0;
      color: #000;
      border-radius: 100px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 1rem;
      letter-spacing: 0.5px;
    }

    h1 {
      margin: 0 0 0.5rem 0;
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--text-on-light);
      background: none;
      -webkit-text-fill-color: initial;
      letter-spacing: -1px;
    }

    .headline {
      margin: 0 0 2rem 0;
      color: var(--text-secondary-on-light);
      font-size: 1.1rem;
      line-height: 1.6;
      max-width: 400px;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn {
      padding: 0.8rem 2rem;
      border-radius: 100px;
      font-weight: 600;
      cursor: pointer;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn.primary {
      background: var(--neon-green);
      color: #000;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .btn.primary:hover {
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      transform: scale(1.05);
    }

    .btn.secondary {
      background: #333;
      color: #fff;
      border: 1px solid #333;
    }

    .btn.secondary:hover {
      background: #000;
      border-color: #000;
      color: var(--neon-green);
    }
  `
})
export class ProfileTileComponent {

}
