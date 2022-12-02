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

logs:
	docker compose -f docker-compose-production.yml logs

stop-local:
	docker compose -f docker-compose-production.yml down

####

build-production:
	cd backend && $(MAKE) build-production
	cd frontend && $(MAKE) build-production

run-production:
	docker compose -f docker-compose-production.yml up -d

stop-production:
	docker compose -f docker-compose-production.yml down

include .env
ssh:
	ssh $(SSH_STRING)

copy-files:
	scp -r ./* $(SSH_STRING):/root/

copy-env:
	scp -r ./.env $(SSH_STRING):/root/