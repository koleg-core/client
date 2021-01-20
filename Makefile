#!/usr/bin/make -f
.PHONY: all, build

export GPG_TTY := tty # GPG fix on Macos
export SHELL := /bin/bash
MAKEFLAGS += --no-print-directory

# HELP
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
# And: https://gist.github.com/jed-frey/fcfb3adbf2e5ff70eae44b04d30640ad
help: ## 💡This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

init: ## 🕐 Download submodules
	@echo "+ $@"
	@git submodule update --init --recursive --remote

build: ## � Build with docker-compose
	@echo "+ $@"
	@docker-compose build --parallel

up: ## 🐳 Local run with docker-compose
	@echo "+ $@"
	@docker-compose up \
		-d \
		--remove-orphans \
		--always-recreate-deps

down: ## ⬇️ Down services
	@echo "+ $@"
	@docker-compose down -t 10

logs: ##📝 See docker logs
	@echo "+ $@"
	@docker-compose logs --tail=200 -f

exec: ## 💬 Get shell into container
	@echo "+ $@"
	@docker-compose exec client sh

start: # ♻️  locally run with angular cli
	@echo "+ $@"
	@npm i
	@npm start
