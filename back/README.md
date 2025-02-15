# Книга памяти
docker compose exec app php artisan lighthouse:clear-cache
docker compose exec app php artisan db:seed --class=RolePermissionSeeder

