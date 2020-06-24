## google review scraper

this tool enable you to scrape google review
Note : ATM, google is using ajax to load dynamically further review on mouse scroll
So we need to emulate user interaction with webpage (clicks & scrolls)

## technological stack

- pupeteer-core (light version of pupeteer without browser)
- headless chrome of alixaxel github repo (https://github.com/alixaxel/chrome-aws-lambda)
- Note : selenium is overkill and nearly dead, phatomjs is dead, bs4 or scrappy not sufficient

## install
for local run (not needed in zip lambda because layer contain those)
- npm install chrome-aws-lambda --save-prod
- npm install puppeteer-core --save-prod
- install pupeteer (eventually for local use, too big for aws)
- npm install aws-sdk (local use?)

or 
- npm install (will install package.json, should add aws there also)

## Usage 

- pupeteer-core + headless is uploaded into an aws layer (see script)
- code is uploaded into a lambda function, and uses the layer

## note : 
https://bitsofco.de/how-to-use-puppeteer-in-a-netlify-aws-lambda-function/
- on aws : should use chrome-aws-lambda. a compressed chromium.br is there
- apparently : 
-- cannot find it (on aws or local). only way he finds it is when installing pupetter.
-- should look pupeteer then, pupeteer-core
-- should find the compressed browser but doenst
-- possible to specify path of browser (or else look at different places)
-- to try to make him think he is on aw, some env variable can be specified (.env file), then headless true




