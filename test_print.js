import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Navigating to local dev server...');
    try {
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 10000 });

        // Wait for the app to load
        await page.waitForSelector('text=Start New LFI');
        await page.click('text=Start New LFI');

        // Fill some data quickly - this is just to navigate to the preview page
        await page.fill('input[placeholder="e.g., Hydraulic Leak in Sector 4"]', 'Test LFI PDF');
        await page.fill('input[placeholder="e.g., John Doe, Maintenance Team"]', 'Test Team');
        await page.fill('textarea[placeholder="Describe the problem in detail..."]', 'This is a test description. This should break pages correctly if there is a lot of text.');

        // Click next all the way to Review Export
        await page.click('button:has-text("Next")'); // Problem details
        await page.click('button:has-text("Next")'); // RCA
        await page.click('button:has-text("Next")'); // Actions
        await page.click('button:has-text("Next")'); // Lessons
        await page.click('button:has-text("Next")'); // Risk
        await page.click('button:has-text("Next")'); // Validation

        // Now on Review Export
        await page.waitForSelector('text=Review & Export');
        console.log('Reached Review Export, waiting for network idle...');
        await page.waitForTimeout(1000); // Give it a second to render

        console.log('Generating PDF...');
        await page.pdf({
            path: 'test-export.pdf',
            format: 'A4',
            printBackground: true,
            margin: {
                top: '15mm',
                right: '15mm',
                bottom: '15mm',
                left: '15mm'
            }
        });

        const stats = fs.statSync('test-export.pdf');
        console.log(`✅ PDF Generated successfully! Size: ${(stats.size / 1024).toFixed(2)} KB`);

    } catch (e) {
        console.error('Error during test:', e);
    } finally {
        await browser.close();
    }
})();
