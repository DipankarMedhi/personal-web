import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <p class="connect-text">Connect with me</p>
      <div class="social-links">
        <a href="https://www.facebook.com" target="_blank" class="social-link fb">Facebook</a>
        <a href="https://www.linkedin.com/in/dipankar-medhi" target="_blank" class="social-link li">LinkedIn</a>
      </div>
    </footer>
  `,
  styles: `
    footer {
      text-align: center;
      padding: 1rem;
      color: var(--text-primary);
    }

    .connect-text {
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
    }

    .social-link {
      font-weight: 600;
      padding-bottom: 2px;
      border-bottom: 2px solid transparent;
    }

    .social-link:hover {
      border-color: currentColor;
    }

    .fb { color: #1877f2; }
    .li { color: #0077b5; }
  `
})
export class FooterComponent {

}
