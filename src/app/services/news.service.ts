import { Injectable } from '@angular/core';

export interface NewsArticle {
    title: string;
    url: string;
    thumbnail?: string;
    category: string;
    summary?: string;
}

export interface DailyByte {
    date: string;
    mainStory: NewsArticle;
    sportsHighlight: NewsArticle;
}

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private readonly STORAGE_KEY = 'daily_news_byte';
    private readonly API_KEY_STORAGE = 'guardian_api_key';

    constructor() { }

    async getDailyNews(): Promise<DailyByte | null> {
        const today = new Date().toISOString().split('T')[0];
        const cached = localStorage.getItem(this.STORAGE_KEY);

        if (cached) {
            const data = JSON.parse(cached) as DailyByte;
            if (data.date === today) {
                console.log('Returning cached news for today.');
                return data; // Return cached data if it's from today
            }
        }

        return await this.fetchAndCurateNews(today);
    }

    private async fetchAndCurateNews(date: string): Promise<DailyByte | null> {
        const apiKey = localStorage.getItem(this.API_KEY_STORAGE);
        if (!apiKey) return null; // No key, can't fetch

        try {
            // Fetch Main News (World/Technology)
            const mainNews = await this.fetchFromGuardian(apiKey, 'world');

            // Fetch Sports News
            const sportsNews = await this.fetchFromGuardian(apiKey, 'sport');

            if (!mainNews || !sportsNews) throw new Error('Failed to fetch news');

            const dailyByte: DailyByte = {
                date,
                mainStory: mainNews,
                sportsHighlight: sportsNews
            };

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dailyByte));
            return dailyByte;

        } catch (error) {
            console.error('Error fetching news:', error);
            return null; // Handle error gracefully
        }
    }

    private async fetchFromGuardian(apiKey: string, section: string): Promise<NewsArticle | null> {
        try {
            const response = await fetch(
                `https://content.guardianapis.com/search?section=${section}&order-by=newest&show-fields=thumbnail,trailText&page-size=1&api-key=${apiKey}`
            );
            const data = await response.json();

            if (data.response && data.response.results && data.response.results.length > 0) {
                const result = data.response.results[0];
                return {
                    title: result.webTitle,
                    url: result.webUrl,
                    category: section === 'sport' ? 'Sports Highlight' : 'Main Story',
                    thumbnail: result.fields?.thumbnail,
                    summary: result.fields?.trailText
                };
            }
            return null;
        } catch (e) {
            console.error(`Failed to fetch ${section} news`, e);
            return null;
        }
    }

    saveApiKey(key: string) {
        localStorage.setItem(this.API_KEY_STORAGE, key);
    }

    hasApiKey(): boolean {
        return !!localStorage.getItem(this.API_KEY_STORAGE);
    }
}
