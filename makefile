sdocker:
	@bash '/Applications/Docker/Docker Quickstart Terminal.app/Contents/Resources/Scripts/start.sh'

setup:
	@docker build -t huge/chat .

up:
	@docker run --name="chat" -d -p 4000:4000 -v $(PWD):/app huge/chat

remake:
	@docker rm -f chat && docker rmi huge/chat && make setup

bundle:
	@docker exec chat npm run bundle

ssh:
	@docker exec -i -t chat bash

sync-config:
	@docker exec chat rm package.json webpack.config.js && docker cp package.json chat:/app/package.json && docker cp webpack.config.js chat:/app/webpack.config.js

jshint:
	@docker exec chat npm run jshint

jscs:
	@docker exec chat npm run jscs

jscs-fix:
	@docker exec chat npm run jscsfix

unit:
	@docker exec chat npm run unit

integration:
	@docker exec chat npm run integration

test:
	@docker exec chat npm run test

watch:
	@docker exec chat npm run watch

dev:
	@docker exec chat npm run dev
