sdocker:
	@bash '/Applications/Docker/Docker Quickstart Terminal.app/Contents/Resources/Scripts/start.sh'

setup:
	@docker build -t huge/chat .
