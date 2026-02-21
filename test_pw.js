import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('pageerror', err => console.log('>>> BROWSER EXCEPTION:', err.message, '\n', err.stack));
    page.on('console', msg => {
        console.log('>>> BROWSER LOG:', msg.text());
    });

    console.log('Navigating to local dev server...');
    try {
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 10000 });
    } catch (e) {
        console.log('Navigation finished or timed out.');
    }

    await browser.close();
})();
