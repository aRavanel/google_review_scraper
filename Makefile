# declare macros/variables
# -------------------------
FILE_TAG := $(shell date +%Y-%m-%d-%H%M%S)
FILE_NAME = google_review_scraper_deployment-$(FILE_TAG)

# Actions to always execute
# -------------------------

.PHONY: compress-scraper
compress-scraper:
	zip -q -r $(FILE_NAME) * \
	&& mv $(FILE_NAME).zip ../$(FILE_NAME).zip

.PHONY: deploy-scraper
deploy-scraper: compress-scraper
	aws s3 cp $(ACTIVITY_FULL_FILE_NAME) $(ACTIVITY_S3_BUCKET_PATH) \
	&& aws lambda update-function-code \
		--function-name $(ACTIVITY_SCRAPER_FUNCTION_NAME) \
		--s3-bucket $(S3_BUCKET) \
		--s3-key $(ACTIVITY_S3_KEY) \
	&& rm $(ACTIVITY_FULL_FILE_NAME)
