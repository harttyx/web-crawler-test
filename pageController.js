const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance, req, res){
    const link = req.query.website;
	let browser;
	if (!link) {
		console.log("No url provided.");
        res.status(400).send("Error: Kindly provide the website url to crawl as a parameter.");
	}else {
		try{
			browser = await browserInstance;
			let response = await pageScraper.scraper(browser,link);	
			res.status(200).send(response);
		}
		catch(err){
			res.status(500).send('Could not crawl through the site given.');
		}
	}
	
}

module.exports = (browserInstance, req, res) => scrapeAll(browserInstance, req, res)