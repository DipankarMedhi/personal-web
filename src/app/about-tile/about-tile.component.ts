import { Component } from '@angular/core';

@Component({
  selector: 'app-about-tile',
  standalone: true,
  imports: [],
  template: `
    <div class="about-card">
      <h2>About Me</h2>
      <p>I'm a passionate learner exploring different areas of coding.</p>
      
      <h3>Hobbies</h3>
      <div class="hobbies-grid">
        <div class="hobby-item">
          <span class="emoji">🎾</span>
          <span>Tennis Player</span>
        </div>
        <div class="hobby-item">
          <span class="emoji">💻</span>
          <span>Coding</span>
        </div>
        <div class="hobby-item">
          <span class="emoji">📚</span>
          <span>Continuous Learning</span>
        </div>
      </div>
    </div>
  `,
  styles: `
    .about-card {
      background: var(--card-bg);
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      height: 100%;
      text-align: left;
      transition: transform 0.3s ease;
    }

    .about-card:hover {
      transform: translateY(-5px);
    }

    h2 {
      color: #000;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .hobbies-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .hobby-item {
      background: #f0f0f0;
      padding: 0.5rem 1rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
      color: #333;
    }

    .emoji {
      font-size: 1.2rem;
    }
  `
})
export class AboutTileComponent {

}
