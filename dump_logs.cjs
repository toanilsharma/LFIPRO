const puppeteer = require('puppeteer');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Capture console messages
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));

    console.log('Navigating to http://localhost:3000...');
    try {
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 8000 });
    } catch (e) {
        console.log('Navigation timeout/finished.');
    }

    await browser.close();
    console.log('Done.');
})();
