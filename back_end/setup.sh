#!/bin/bash
# cp .env.example .env

# docker compose up -d

composer i

php artisan key:generate
php artisan migrate

php artisan db:seed

npm i
npm run build

php artisan serve --port=8000
