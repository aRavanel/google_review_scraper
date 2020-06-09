## google review scraper

this tool enable you to scrape google review
Note : ATM, google is using ajax to load dynamically further review on mouse scroll
So we need to emulate user interaction with webpage (clicks & scrolls)

## technological stack

- pupeteer-core (light version of pupeteer without browser)
- headless chrome of alixaxel github repo (https://github.com/alixaxel/chrome-aws-lambda)
- Note : selenium is overkill and nearly dead, phatomjs is dead, bs4 or scrappy not sufficient

## Usage 

- pupeteer + headless is uploaded into an aws layer (see script)
- code is uploaded into a lambda function, and uses the layer



