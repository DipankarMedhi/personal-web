import { Component } from '@angular/core';

@Component({
  selector: 'app-about-tile',
  standalone: true,
  imports: [],
  template: `
    <div class="about-card fade-in" style="animation-delay: 0.2s">
      <div class="card-header">
        <h2>About Me</h2>
        <div class="decoration-line"></div>
      </div>
      
      <p class="bio">
        I'm a passionate learner exploring different areas of coding. I love building intuitive user experiences and solving complex problems with clean, efficient code.
      </p>
      
      <h3>Current Interests</h3>
      <div class="hobbies-grid">
        <div class="hobby-item">
          <span class="emoji">🎾</span>
          <span class="text">Tennis Player</span>
        </div>
        <div class="hobby-item">
          <span class="emoji">💻</span>
          <span class="text">Coding</span>
        </div>
        <div class="hobby-item">
          <span class="emoji">📚</span>
          <span class="text">Continuous Learning</span>
        </div>
        <div class="hobby-item">
          <span class="emoji">🚀</span>
          <span class="text">Web Dev</span>
        </div>
      </div>
    </div>
  `,
  styles: `
    .about-card {
      background: var(--card-light-bg);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 3rem;
      border-radius: var(--card-radius);
      height: 100%;
      text-align: left;
      transition: all 0.4s ease;
      position: relative;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .about-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }
    
    .card-header {
      margin-bottom: 1.5rem;
    }

    h2 {
      color: var(--text-on-light);
      margin: 0 0 0.5rem 0;
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    
    .decoration-line {
      width: 60px;
      height: 4px;
      background: var(--neon-green);
      border-radius: 2px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .bio {
      color: var(--text-secondary-on-light);
      line-height: 1.8;
      margin-bottom: 2.5rem;
      font-size: 1.1rem;
    }

    h3 {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #666;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    .hobbies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 1rem;
    }

    .hobby-item {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      border: 1px solid #eee;
      transition: all 0.3s ease;
    }
    
    .hobby-item:hover {
      background: #fff;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      transform: translateY(-2px);
    }

    .emoji {
      font-size: 1.5rem;
    }
    
    .text {
      color: #333;
      font-size: 0.95rem;
      font-weight: 600;
    }
  `
})
export class AboutTileComponent {

}
