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
	ENV=local docker compose -f docker-compose-production.yml up
	
stop-local:
	ENV=local docker compose -f docker-compose-production.yml down

####

build-production:
	cd backend && $(MAKE) build-production
	cd frontend && $(MAKE) build-production

run-production:
	ENV=production docker compose -f docker-compose-production.yml up

stop-production:
	ENV=production docker compose -f docker-compose-production.yml down

SSH_STRING:=root@143.110.237.51

ssh:
	ssh $(SSH_STRING)

copy-files:
	scp -r ./* $(SSH_STRING):/root/