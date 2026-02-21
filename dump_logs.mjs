import puppeteer from 'puppeteer';

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));

    console.log('Navigating to http://localhost:3000...');
    try {
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    } catch (e) {
        console.log('Done.');
    }

    await browser.close();
})();
