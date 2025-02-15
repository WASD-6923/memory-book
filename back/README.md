# Сервис для групп АА

docker compose exec app php artisan lighthouse:clear-cache
docker compose exec app php artisan db:seed --class=RolePermissionSeeder

