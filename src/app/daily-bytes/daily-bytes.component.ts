import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DailyByte, NewsService } from '../services/news.service';

@Component({
  selector: 'app-daily-bytes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="daily-bytes-container">
      
      <!-- State 1: No API Key -->
      <div *ngIf="!hasKey" class="key-input-section">
        <div class="agent-card">
          <div class="icon">🤖</div>
          <h2>Activate Daily News Agent</h2>
          <p>Enter your free Guardian API Key to enable the AI agent.</p>
          <div class="input-group">
            <input [(ngModel)]="apiKeyInput" placeholder="Paste API Key here..." />
            <button (click)="saveKey()" [disabled]="!apiKeyInput">Initialize Agent</button>
          </div>
          <p class="hint">Don't have one? <a href="https://open-platform.theguardian.com/access/" target="_blank">Get a free key</a></p>
        </div>
      </div>

      <!-- State 2: Loading / Agent Working -->
      <div *ngIf="hasKey && isLoading" class="loading-section">
        <div class="terminal">
          <div class="terminal-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="title">Agent Status</span>
          </div>
          <div class="terminal-body">
            <div *ngFor="let log of agentLogs" class="log-line">
              <span class="timestamp">[{{log.time}}]</span> {{log.message}}
            </div>
            <div class="cursor">_</div>
          </div>
        </div>
      </div>

      <!-- State 3: Content Display -->
      <div *ngIf="dailyByte && !isLoading" class="content-section">
        <div class="header-row">
          <h1>Daily New Bytes</h1>
          <span class="date">{{dailyByte.date | date:'fullDate'}}</span>
        </div>

        <div class="news-grid">
          <!-- Main Story Card -->
          <a [href]="dailyByte.mainStory.url" target="_blank" class="news-card main">
            <div class="card-image" [style.backgroundImage]="'url(' + (dailyByte.mainStory.thumbnail || 'assets/placeholder-news.jpg') + ')'">
              <div class="category-tag">{{dailyByte.mainStory.category}}</div>
            </div>
            <div class="card-content">
              <h2>{{dailyByte.mainStory.title}}</h2>
              <p [innerHTML]="dailyByte.mainStory.summary"></p>
            </div>
          </a>

          <!-- Sports Card -->
          <a [href]="dailyByte.sportsHighlight.url" target="_blank" class="news-card sport">
             <div class="card-image" [style.backgroundImage]="'url(' + (dailyByte.sportsHighlight.thumbnail || 'assets/placeholder-sport.jpg') + ')'">
              <div class="category-tag sport-tag">{{dailyByte.sportsHighlight.category}}</div>
            </div>
            <div class="card-content">
              <h2>{{dailyByte.sportsHighlight.title}}</h2>
              <p [innerHTML]="dailyByte.sportsHighlight.summary"></p>
            </div>
          </a>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .daily-bytes-container {
      max-width: 1000px;
      margin: 0 auto;
      color: #fff;
    }

    /* Key Input Section */
    .agent-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 3rem;
      text-align: center;
      backdrop-filter: blur(10px);
      max-width: 500px;
      margin: 4rem auto;
    }

    .icon { font-size: 3rem; margin-bottom: 1rem; }
    
    .input-group {
      display: flex;
      gap: 10px;
      margin: 2rem 0;
    }

    input {
      flex: 1;
      padding: 10px 15px;
      border-radius: 8px;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }

    button {
      padding: 10px 20px;
      border-radius: 8px;
      border: none;
      background: var(--neon-green);
      color: #000;
      font-weight: bold;
      cursor: pointer;
    }
    
    button:disabled { opacity: 0.5; cursor: not-allowed; }

    .hint a { color: var(--neon-green); }

    /* Terminal Loading */
    .terminal {
      background: #000;
      border-radius: 10px;
      border: 1px solid #333;
      font-family: 'Courier New', monospace;
      max-width: 600px;
      margin: 4rem auto;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    .terminal-header {
      padding: 10px 15px;
      background: #1a1a1a;
      border-bottom: 1px solid #333;
      border-radius: 10px 10px 0 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
    .red { background: #ff5f56; }
    .yellow { background: #ffbd2e; }
    .green { background: #27c93f; }
    .title { margin-left: 10px; color: #888; font-size: 0.8rem; }

    .terminal-body {
      padding: 20px;
      color: #0f0;
      min-height: 200px;
    }

    .log-line { margin-bottom: 5px; opacity: 0; animation: fadeIn 0.3s forwards; }
    @keyframes fadeIn { to { opacity: 1; } }
    .cursor { animation: blink 1s infinite; display: inline-block; }
    @keyframes blink { 50% { opacity: 0; } }

    /* News Grid */
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 1rem;
    }
    
    .date { color: var(--neon-green); font-weight: bold; }

    .news-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 768px) {
      .news-grid { grid-template-columns: 1.5fr 1fr; }
    }

    .news-card {
      background: rgba(255,255,255,0.03);
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.05);
      transition: transform 0.3s, background 0.3s;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .news-card:hover {
      transform: translateY(-5px);
      background: rgba(255,255,255,0.07);
    }

    .card-image {
      height: 200px;
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .category-tag {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: var(--neon-green);
      color: #000;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
    }
    
    .sport-tag { background: #fff; }

    .card-content { padding: 1.5rem; }
    
    h2 { margin: 0 0 1rem 0; font-size: 1.4rem; color: #fff; line-height: 1.3; }
    p { color: #aaa; margin: 0; line-height: 1.6; font-size: 0.95rem; }
  `]
})
export class DailyBytesComponent implements OnInit {
  hasKey = false;
  apiKeyInput = '';
  isLoading = false;
  dailyByte: DailyByte | null = null;
  agentLogs: { time: string, message: string }[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.checkKey();
  }

  checkKey() {
    this.hasKey = this.newsService.hasApiKey();
    if (this.hasKey) {
      this.loadNews();
    }
  }

  saveKey() {
    if (this.apiKeyInput.trim()) {
      this.newsService.saveApiKey(this.apiKeyInput.trim());
      this.hasKey = true;
      this.loadNews();
    }
  }

  async loadNews() {
    this.isLoading = true;
    this.agentLogs = [];

    // Simulate Agent steps
    await this.log('Agent waking up...');
    await this.log('Checking local cache for today\'s briefcase...');

    // Check cache implicitly via service, but we add delay for effect
    await new Promise(r => setTimeout(r, 800));

    try {
      this.dailyByte = await this.newsService.getDailyNews();

      if (this.dailyByte) {
        await this.log('Briefcase found/generated.');
        await this.log('Curating final display...');
        await new Promise(r => setTimeout(r, 600));
        this.isLoading = false;
      } else {
        await this.log('Error: specific news could not be located.');
        // Stay in loading or show error state (simplified)
      }
    } catch (e) {
      await this.log('Critical failure in news subsystem.');
    }
  }

  private async log(message: string) {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.agentLogs.push({ time, message });
    await new Promise(r => setTimeout(r, 800)); // Artificial delay for effect
  }
}
