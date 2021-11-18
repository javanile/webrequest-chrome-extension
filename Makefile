
.PHONY: release

install:
	@npm install

release: release-ifttt release-webrequest
	@echo "All packages are ready."

release-ifttt:
	@cp -f src/globals-ifttt.js src/globals.js
	@RELEASE_PATH=release/ifttt npm run release
	@rm -f release/ifttt/globals-*.js
	@cd release/ifttt && zip -ur ../ifttt.zip .

release-ifttt-bookmark:
	@cp -f src/globals-ifttt-bookmark.js src/globals.js
	@RELEASE_PATH=release/ifttt-bookmark npm run release
	@rm -f release/ifttt-bookmark/globals-*.js
	@cd release/ifttt-bookmark && zip -ur ../ifttt-bookmark.zip .

release-webrequest:
	@cp -f src/globals-webrequest.js src/globals.js
	@RELEASE_PATH=release/webrequest npm run release
	@rm -f release/webrequest/globals-*.js
	@cd release/webrequest && zip -ur ../webrequest.zip .
