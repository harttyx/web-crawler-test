const pageScraper = require('./pageScraper');
const fs = require('fs');

async function scrapeAll(browserInstance, req, res){
    const link = req.query.website;

	// if path is given then a sitemap.xml file will be saved to the path after crawling successfully
	const filePath = req.query.path;
	let browser;
	if (!link) {
		console.log("No url provided.");
        res.status(400).send("Error: Kindly provide the website url to crawl as a parameter.");
	}else {
		try{
			browser = await browserInstance;
			let response = await pageScraper.scraper(browser,link);

			//whether or not you want to create a sitemap.xml file
			if (filePath) {
				console.log(filePath);
				try {
					fs.writeFile(filePath + "/sitemap.xml", saveSitemap(response), (err) => {
						if(err) return err;
						return true;     
					});
				} catch (error) {
					console.log(error);
				}
			}

			res.status(200).send(response);
		}
		catch(err){
			res.status(500).send('Could not crawl through the site given, make sure it is a valid URL.');
		}
	}
	
}

let saveSitemap = (links) => {
    var map = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    links.forEach(link => {
        map += '<url><loc>' + link.url +'</loc><priority>0.5</priority></url>\n';
    });
    map += '</urlset>';
    return map;
}

module.exports = (browserInstance, req, res) => scrapeAll(browserInstance, req, res)