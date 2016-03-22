
build-image:
	docker build --rm --force-rm -t malera/nd-conf .

run-development:
	docker-compose run -p 3100:3100 --rm development
