import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-tile',
  standalone: true,
  imports: [],
  template: `
    <div class="profile-card">
      <div class="photo-container">
        <!-- Placeholder for actual photo -->
        <div class="photo-placeholder">DM</div>
        <!-- <img src="assets/profile.jpg" alt="Dipankar Medhi" class="photo" /> -->
      </div>
      <div class="info">
        <h1>Dipankar Medhi</h1>
        <p class="headline">Software Engineer | Tennis Player | Coding Enthusiast</p>
        <div class="actions">
          <a href="https://www.linkedin.com/in/dipankar-medhi" target="_blank" class="linkedin-btn">
            View LinkedIn
          </a>
          <a href="Dipankar_Resume.pdf" download="Dipankar_Medhi_Resume.pdf" class="resume-btn">
            Download Resume
          </a>
        </div>
      </div>
    </div>
  `,
  styles: `
    .profile-card {
      background: var(--card-bg);
      padding: 2rem;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: transform 0.3s ease;
    }
    
    .profile-card:hover {
      transform: translateY(-5px);
    }

    .photo-container {
      margin-bottom: 1.5rem;
    }

    .photo-placeholder {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #333;
      color: var(--neon-green);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2.5rem;
      font-weight: bold;
      margin: 0 auto;
      border: 4px solid #fff;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .photo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      margin: 0 auto;
      border: 4px solid #fff;
    }

    h1 {
      margin: 0 0 0.5rem 0;
      font-size: 1.8rem;
      color: #000;
    }

    .headline {
      margin: 0 0 1.5rem 0;
      color: var(--text-secondary);
      font-size: 1rem;
      line-height: 1.5;
    }

    .info a {
      margin: 0.5rem;
    }

    .linkedin-btn {
      display: inline-block;
      padding: 0.8rem 1.5rem;
      background: #0077b5;
      color: white;
      border-radius: 50px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .resume-btn {
      display: inline-block;
      padding: 0.8rem 1.5rem;
      background: #333;
      color: var(--neon-green);
      border-radius: 50px;
      font-weight: 600;
      letter-spacing: 0.5px;
      border: 2px solid #333;
      transition: all 0.3s ease;
    }
    
    .resume-btn:hover {
      background: transparent;
      color: #333;
    }
  `
})
export class ProfileTileComponent {

}
