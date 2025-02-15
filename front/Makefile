init-docker:
	cp back/.env.docker back/.env
	cp front/.env.docker front/.env
	cp docker-compose.dev.yml docker-compose.yml
	docker compose up -d
	docker compose exec back bash -c "/usr/bin/composer install"
	docker compose exec back bash -c "/usr/bin/php artisan migrate:fresh --force --seed"

up:
	docker compose up -d

down:
	docker compose down

migrate:
	docker compose exec back bash -c "/usr/bin/php artisan migrate"

migrate-seed:
	docker compose exec back bash -c "/usr/bin/php artisan migrate:fresh --force --seed"

build-front:
	docker compose up app
