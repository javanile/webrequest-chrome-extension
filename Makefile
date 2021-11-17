
.PHONY: release

install:
	@npm install

release: release-ifttt release-webrequest
	@echo "All packages are ready."

release-ifttt:
	@RELEASE_PATH=release/webrequest npm run release
	@cd release/webrequest && zip -ur ../webrequest.zip .

release-webrequest:
	@RELEASE_PATH=release/webrequest npm run release
	@cd release/webrequest && zip -ur ../webrequest.zip .
