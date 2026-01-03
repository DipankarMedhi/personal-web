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
                return data;
            }
        }

        // Try to fetch real news first
        const realNews = await this.fetchAndCurateNews(today);
        if (realNews) return realNews;

        // Fallback to Demo News if no API key or fetch failed
        console.log('Falling back to Demo News');
        return this.getDemoNews(today);
    }

    private getDemoNews(date: string): DailyByte {
        return {
            date: date,
            mainStory: {
                title: "AI Agent Builds Personal Website in Record Time",
                url: "https://www.deepmind.com/about",
                category: "Tech Demo",
                thumbnail: "assets/ai-tech.jpg", // Ensure this asset exists or handle missing
                summary: "In a stunning demonstration of human-AI collaboration, a developer and an AI agent built a glassmorphism-styled portfolio site in under an hour. The site features dynamic cached news and a premium aesthetic."
            },
            sportsHighlight: {
                title: "Grand Slam: Tennis Season Heats Up",
                url: "https://www.atptour.com",
                category: "Tennis",
                thumbnail: "assets/tennis.jpg",
                summary: "As the new season approaches, all eyes are on the upcoming majors. Analysts predict a shift in the rankings as the next generation of players steps up to challenge the legends."
            }
        };
    }

    private async fetchAndCurateNews(date: string): Promise<DailyByte | null> {
        const apiKey = localStorage.getItem(this.API_KEY_STORAGE);
        if (!apiKey) return null;

        try {
            // Fetch Main News (World/Technology)
            const mainNews = await this.fetchFromGuardian(apiKey, 'technology'); // Changed to technology for more relevance

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
            return null;
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
                    category: section === 'sport' ? 'Sports Highlight' : 'Tech & World',
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
        // Clear cache to force refresh with new key
        localStorage.removeItem(this.STORAGE_KEY);
    }

    hasApiKey(): boolean {
        return !!localStorage.getItem(this.API_KEY_STORAGE);
    }
}
