build-dev:
	docker build -t react-app .

build-local:
	docker build \
	 -t react-app-production:local \
	 --build-arg CADDYFILE=Caddyfile.local \
	 -f Dockerfile.production .

build-production:
	docker build \
	 -t react-app-production:production \
	 --build-arg CADDYFILE=Caddyfile.production \
	 -f Dockerfile.production .