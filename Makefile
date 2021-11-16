
.PHONY: release

install:
	@npm install

release:
	@npm run release
	@cd release && zip -ur ../release.zip .
