import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());


export const handleCloudflare = async ({ baseUrl, path }: { baseUrl: string, path: string }): Promise<any> => {
    try {
        const browser = await puppeteer.launch({ headless: true, args: ['--disable-features=site-per-process'] });

        const target = await browser.newPage();
        await target.goto((baseUrl ?? '') + path, { waitUntil: 'networkidle2' });
        
        const pageBody = await target.evaluate(() => document.querySelector('pre')?.innerText);
        await browser.close();
        
        return JSON.parse(pageBody!);
    } catch(e) {
        console.log(e);
        return null;
    }
};