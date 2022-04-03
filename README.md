# web-crawler-test
**Web crawler test**

This is just a sample web crawling api that goes through a specified website url and returns a list of the links in the site with the page titles and number of images in each page.

To start the server after you clone just type _**"npm run start"**_ in the terminal. The endpoint for crawling through a website is "**/crawl"** which handles get requests and a parameter "website" is required after that which would be the specific website you want to scrap.

Example: "http://localhost:3000/crawl?website=https://www.google.com"

Another parameter which is not required but can be acccepted is "path". If this parameter is given, then the **"/crawl"** endpoint would save a **sitemap.xml** file containing the links in the specified website (Creating a basic sitemap for the site).
