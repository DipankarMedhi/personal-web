import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DailyByte, NewsService } from '../services/news.service';

@Component({
  selector: 'app-daily-bytes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="daily-bytes-container fade-in">
      
      <!-- Header with Settings Toggle -->
      <div class="header-row">
        <div>
           <h1>Daily New Bytes</h1>
           <span *ngIf="dailyByte" class="date">{{dailyByte.date | date:'fullDate'}}</span>
        </div>
        <button class="settings-btn" (click)="toggleSettings()" title="Configure Agent">
          ⚙️
        </button>
      </div>

      <!-- Settings / Key Input Section (Hidden by default) -->
      <div *ngIf="showSettings" class="settings-panel">
        <div class="agent-card">
          <div class="icon">🤖</div>
          <h2>Configure News Agent</h2>
          <p>Enter your Guardian API Key to enable live AI news cursing.</p>
          <div class="input-group">
            <input [(ngModel)]="apiKeyInput" placeholder="Paste API Key here..." />
            <button (click)="saveKey()" [disabled]="!apiKeyInput">Save Key</button>
          </div>
          <p class="hint">Currently running: <strong>{{ hasKey ? 'Live Mode' : 'Demo Mode' }}</strong></p>
          <p class="hint small"><a href="https://open-platform.theguardian.com/access/" target="_blank">Get a free key</a></p>
        </div>
      </div>

      <!-- State: Loading / Agent Working -->
      <div *ngIf="isLoading" class="loading-section">
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

      <!-- State: Content Display -->
      <div *ngIf="dailyByte && !isLoading" class="content-section">
        
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
        
        <div *ngIf="!hasKey" class="demo-banner">
          Running in Demo Mode. Add an API key to get live daily updates.
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

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 1rem;
    }
    
    h1 { margin: 0; font-size: 2.5rem; }
    .date { color: var(--neon-green); font-weight: bold; font-size: 1rem; }

    .settings-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.3s;
    }
    
    .settings-btn:hover { background: rgba(255,255,255,0.2); transform: rotate(90deg); }

    .settings-panel {
      margin-bottom: 2rem;
      animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    /* Key Input Section */
    .agent-card {
      background: rgba(20, 20, 20, 0.95);
      border: 1px solid var(--neon-green);
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      max-width: 500px;
      margin: 0 auto;
      box-shadow: 0 0 30px rgba(204, 255, 0, 0.1);
    }

    .icon { font-size: 3rem; margin-bottom: 1rem; }
    
    .input-group {
      display: flex;
      gap: 10px;
      margin: 1.5rem 0;
    }

    input {
      flex: 1;
      padding: 12px 15px;
      border-radius: 8px;
      border: 1px solid #333;
      background: #000;
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

    .hint { color: #888; margin-top: 1rem; }
    .hint.small { font-size: 0.8rem; }
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
    .news-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 768px) {
      .news-grid { grid-template-columns: 1.5fr 1fr; }
    }

    .news-card {
      background: var(--card-light-bg);
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.05);
      transition: transform 0.3s, background 0.3s;
      display: flex;
      flex-direction: column;
      height: 100%;
      text-decoration: none;
    }

    .news-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .card-image {
      height: 200px;
      background-size: cover;
      background-position: center;
      position: relative;
      background-color: #333;
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
    
    h2 { margin: 0 0 1rem 0; font-size: 1.4rem; color: var(--text-on-light); line-height: 1.3; }
    p { color: var(--text-secondary-on-light); margin: 0; line-height: 1.6; font-size: 0.95rem; }
    
    .demo-banner {
      margin-top: 2rem;
      text-align: center;
      padding: 1rem;
      background: rgba(204, 255, 0, 0.1);
      color: var(--neon-green);
      border-radius: 8px;
      font-size: 0.9rem;
    }
  `]
})
export class DailyBytesComponent implements OnInit {
  hasKey = false;
  apiKeyInput = '';
  isLoading = false;
  dailyByte: DailyByte | null = null;
  agentLogs: { time: string, message: string }[] = [];

  showSettings = false;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.checkKey();
    this.loadNews(); // Always load, will fallback to demo
  }

  checkKey() {
    this.hasKey = this.newsService.hasApiKey();
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  saveKey() {
    if (this.apiKeyInput.trim()) {
      this.newsService.saveApiKey(this.apiKeyInput.trim());
      this.hasKey = true;
      this.showSettings = false; // Hide settings after save
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
