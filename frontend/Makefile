build-dev:
	docker build -t react-app .

build-local:
	docker buildx build \
	 --platform linux/amd64,linux/arm64,linux/arm/v7 \
	 -t joshcord/cypress-app:local \
	 --build-arg CADDYFILE=Caddyfile.local \
	 -f Dockerfile.production --push .

build-production:
	docker buildx build \
	 --platform linux/amd64,linux/arm64,linux/arm/v7 \
	 -t joshcord/cypress-app:production \
	 --build-arg CADDYFILE=Caddyfile.production \
	 -f Dockerfile.production --push .

builder:
	docker buildx create --use --name multi-builder