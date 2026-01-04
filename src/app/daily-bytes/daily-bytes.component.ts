import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DailyByte, NewsService } from '../services/news.service';

@Component({
  selector: 'app-daily-bytes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './daily-bytes.component.html',
  styleUrl: './daily-bytes.component.css'
})
export class DailyBytesComponent implements OnInit {
  hasKey = signal(false);
  apiKeyInput = signal('');
  isLoading = signal(false);
  dailyByte = signal<DailyByte | null>(null);
  agentLogs = signal<{ time: string, message: string }[]>([]);
  showSettings = signal(false);

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.checkKey();
    this.loadNews(); // Always load, will fallback to demo
  }

  checkKey() {
    this.hasKey.set(this.newsService.hasApiKey());
  }

  toggleSettings() {
    this.showSettings.update(v => !v);
  }

  saveKey() {
    const key = this.apiKeyInput().trim();
    if (key) {
      this.newsService.saveApiKey(key);
      this.hasKey.set(true);
      this.showSettings.set(false); // Hide settings after save
      this.loadNews();
    }
  }

  async loadNews() {
    this.isLoading.set(true);
    this.agentLogs.set([]);

    // Simulate Agent steps
    await this.log('Agent waking up...');
    await this.log('Checking local cache for today\'s briefcase...');

    // Check cache implicitly via service, but we add delay for effect
    await new Promise(r => setTimeout(r, 800));

    try {
      const news = await this.newsService.getDailyNews();
      this.dailyByte.set(news);

      if (news) {
        await this.log('Briefcase found/generated.');
        await this.log('Curating final display...');
        await new Promise(r => setTimeout(r, 600));
        this.isLoading.set(false);
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
    this.agentLogs.update(logs => [...logs, { time, message }]);
    await new Promise(r => setTimeout(r, 800)); // Artificial delay for effect
  }
}
