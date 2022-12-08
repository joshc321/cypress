build-dev:
	cd backend && $(MAKE) build-dev
	cd frontend && $(MAKE) build-dev

run-dev:
	docker compose -f docker-compose-dev.yml up

stop-dev:
	docker compose -f docker-compose-dev.yml down

####

build-local:
	cd backend && $(MAKE) build-local
	cd frontend && $(MAKE) build-local

run-local:
	docker compose -f docker-compose-production.yml up -d

####

build-production:
	cd backend && $(MAKE) build-production
	cd frontend && $(MAKE) build-production

run-production:
	docker compose -f docker-compose-production.yml up -d

####
logs:
	docker compose -f docker-compose-production.yml logs
stop:
	docker compose -f docker-compose-production.yml down

####

include .env
ssh:
	ssh $(SSH_STRING)

copy-files:
		scp ./.env ./docker-compose-production.yml ./Makefile $(SSH_STRING):/root


