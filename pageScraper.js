const scraperObject = {
    async scraper(browser, url){
        let page = await browser.newPage();

		/* 
		** Use this if you want to target the origin **
		const domain = (new URL(siteUrl));
		const url = domain.origin;
		*/

		let scrapedData = [];
		console.log(`Navigating to ${url}...`);
		// Navigate to the specified url
		await page.goto(url);

		async function scrapeCurrentPage(){
			await page.waitForSelector('body');
			// Get the links in the page
			console.log("Crawling through the website...");
			let urls = await page.$$eval("a", (el) => {
				return el.map((a) => a.href);
			});
			// Make sure the link to be scraped is part of the domain and not duplicate
			const filteredlinks = urls.filter(link => 
				link.startsWith(url) && !link.includes("#")
			);
			const uniqueLinks = [...new Set(filteredlinks)];
	
			let pagePromise = (link) => new Promise(async(resolve, reject) => {
				let dataObj = {};
				let newPage = await browser.newPage();

				await newPage.goto(link).then(async (value) => {
					dataObj['pageTitle'] = await newPage.$eval('title', title => title.textContent);
					dataObj['noOfImages'] = await newPage.$$eval('img', img => img.length);
					dataObj['url'] = link;
				}).catch((err) => {
					dataObj['url'] = link;
					dataObj['error'] = "Couldn't crawl this page because it redirects to something";
				});
;				console.log(`  going through ${link}`);
				resolve(dataObj);
				await newPage.close();
			});

			for(link in uniqueLinks){
				let currentPageData = await pagePromise(uniqueLinks[link]);
				scrapedData.push(currentPageData);
			}

			await page.close()
			return scrapedData;
		}

		let data = await scrapeCurrentPage();
		
		console.log("Done crawling.");
		console.log("Here's the data collected: ", data);
		await browser.close();
		return data;
    }
}

module.exports = scraperObject;