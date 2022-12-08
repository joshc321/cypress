build-dev:
	docker build -t api-server .

build-local:
	docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t joshcord/cypress-api -f Dockerfile.production --push .

build-production:
	docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t joshcord/cypress-api -f Dockerfile.production --push .

builder:
	docker buildx create --use --name multi-builder