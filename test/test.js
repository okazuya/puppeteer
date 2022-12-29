const puppeteer = require("puppeteer");
const headless = true;

(async() => {
	let browser = await puppeteer.launch({headless});
	const page = await browser.newPage();
	await page.goto('https://pptr.dev/');
	const text = await page.$eval('code', el => el.textContent);
	console.log(text);
	await browser.close();
})();


