import { JSDOM } from 'jsdom';

JSDOM.fromURL('http://localhost:3000', {
    runScripts: "dangerously",
    resources: "usable"
}).then(dom => {
    console.log('JSDOM instance connected to local server...');

    dom.window.console.log = (...args) => console.log('BROWSER LOG:', ...args);
    dom.window.console.error = (...args) => console.log('BROWSER ERROR:', ...args);
    dom.window.onerror = (msg, url, line, col, error) => {
        console.log('GLOBAL ERROR:', msg, error);
    };

    setTimeout(() => {
        console.log('--- HTML DUMP ---');
        console.log(dom.window.document.getElementById('root')?.innerHTML.substring(0, 500) || 'no root element');
        process.exit(0);
    }, 3000);
}).catch(err => {
    console.log('JSDOM Error:', err);
});
