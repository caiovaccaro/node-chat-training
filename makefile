sdocker:
	@bash '/Applications/Docker/Docker Quickstart Terminal.app/Contents/Resources/Scripts/start.sh'

setup:
	@docker build -t huge/chat .

up:
	@docker run --name="chat" -d -p 4000:4000 -v $(PWD):/src/ huge/chat

remake:
	@docker rm -f chat && docker rmi huge/chat && make setup

ssh:
	@docker exec -i -t chat bash

sync-config:
	@docker exec chat cd install && rm package.json && docker cp package.json chat:/install/package.json
